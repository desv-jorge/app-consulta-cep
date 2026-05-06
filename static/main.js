/**
 * App Consulta CEP — Single Page
 * Tab switching + CEP mask + AJAX fetch via BrasilAPI
 */
document.addEventListener('DOMContentLoaded', () => {
    const cepInput = document.getElementById('cepInput');
    const btnBuscar = document.getElementById('btnBuscar');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const apiIdle = document.getElementById('apiIdle');
    const apiLoading = document.getElementById('apiLoading');
    const resultBadge = document.getElementById('resultBadge');
    const resultFields = document.getElementById('resultFields');
    const errorCard = document.getElementById('errorCard');
    const errorMessage = document.getElementById('errorMessage');
    const illustration = document.getElementById('illustration');
    const valCep = document.getElementById('valCep');
    const valState = document.getElementById('valState');
    const valCity = document.getElementById('valCity');
    const valNeighborhood = document.getElementById('valNeighborhood');
    const valStreet = document.getElementById('valStreet');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(`content-${target}`).classList.add('active');
        });
    });

    cepInput.addEventListener('input', () => {
        let v = cepInput.value.replace(/\D/g, '');
        if (v.length > 8) v = v.slice(0, 8);
        if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5);
        cepInput.value = v;
        cepInput.classList.remove('error');
    });

    btnBuscar.addEventListener('click', handleSearch);
    cepInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSearch(); });

    async function handleSearch() {
        const raw = cepInput.value.replace(/\D/g, '');
        if (raw.length < 8) {
            cepInput.classList.add('error');
            cepInput.focus();
            setTimeout(() => cepInput.classList.remove('error'), 1500);
            return;
        }
        tabBtns.forEach(b => b.classList.remove('active'));
        document.getElementById('tabApi').classList.add('active');
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById('content-api').classList.add('active');
        showState('loading');
        try {
            const res = await fetch(`/api/cep/${raw}`);
            const data = await res.json();
            if (!res.ok || data.erro) {
                showState('error', data.message || 'CEP n\u00e3o encontrado.');
                return;
            }
            valCep.textContent = data.cep || '\u2014';
            valState.textContent = data.state || '\u2014';
            valCity.textContent = data.city || '\u2014';
            valNeighborhood.textContent = data.neighborhood || '\u2014';
            valStreet.textContent = data.street || '\u2014';
            showState('success');
        } catch (err) {
            showState('error', 'Erro de conex\u00e3o. Verifique sua internet.');
        }
    }

    function showState(state, msg) {
        apiIdle.style.display = 'none';
        apiLoading.classList.remove('show');
        resultBadge.classList.remove('show');
        resultFields.classList.remove('show');
        errorCard.classList.remove('show');
        illustration.classList.remove('show');
        switch (state) {
            case 'idle': apiIdle.style.display = 'flex'; break;
            case 'loading': apiLoading.classList.add('show'); break;
            case 'success':
                resultBadge.classList.add('show');
                resultFields.classList.add('show');
                illustration.classList.add('show');
                break;
            case 'error':
                errorMessage.textContent = msg;
                errorCard.classList.add('show');
                break;
        }
    }
    cepInput.focus();
});
