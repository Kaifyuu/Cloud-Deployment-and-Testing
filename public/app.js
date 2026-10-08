const method = document.querySelector('#method');
const urlInput = document.querySelector('#url');
const bodyInput = document.querySelector('#body');
const headersInput = document.querySelector('#headers');
const paramsInput = document.querySelector('#params');
const sendButton = document.querySelector('#send');
const responseContent = document.querySelector('#response-content');
const responseMeta = document.querySelector('#response-meta');
const responseStatus = document.querySelector('#response-status');
const responseTime = document.querySelector('#response-time');
const responseSize = document.querySelector('#response-size');
const responseCaption = document.querySelector('#response-caption');
const copyButton = document.querySelector('#copy-response');
const toast = document.querySelector('#toast');
let lastResponse = '';
let rawResponse = '';
let prettyResponse = true;
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function updateMethodState() {
  const hasBody = ['POST', 'PUT', 'PATCH'].includes(method.value);
  document.querySelector('[data-tab="body"]').classList.toggle('disabled', !hasBody);
}

function renderResponse() {
  if (!rawResponse) {
    responseContent.textContent = lastResponse || '(empty response)';
    return;
  }
  let output = rawResponse;
  if (prettyResponse) {
    try { output = JSON.stringify(JSON.parse(rawResponse), null, 2); } catch { /* Preserve non-JSON response text. */ }
  }
  lastResponse = output;
  responseContent.textContent = output || '(empty response)';
}

document.querySelectorAll('.tab').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.tab').forEach((item) => item.classList.toggle('active', item === tab));
  document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.toggle('hidden', panel.id !== `${tab.dataset.tab}-panel`));
}));

document.querySelectorAll('.saved-request').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.saved-request').forEach((item) => item.classList.toggle('active', item === button));
  method.value = button.dataset.method;
  urlInput.value = button.dataset.url;
  if (method.value === 'POST' && !bodyInput.value.trim()) bodyInput.value = '{\n  "username": "jane_doe",\n  "email": "jane@example.com",\n  "password": "test1234",\n  "age": 28\n}';
  if (method.value === 'PUT') bodyInput.value = '{\n  "username": "jane_doe",\n  "email": "jane@example.com",\n  "password": "test1234",\n  "age": 29\n}';
  updateMethodState();
}));

document.querySelector('#add-request').addEventListener('click', () => {
  method.value = 'GET';
  urlInput.value = '/api/users';
  paramsInput.value = '';
  document.querySelectorAll('.saved-request').forEach((item) => item.classList.remove('active'));
  updateMethodState();
  urlInput.focus();
});

document.querySelector('#clear-params').addEventListener('click', () => { paramsInput.value = ''; });

async function sendRequest() {
  let headers;
  let params;
  try { headers = JSON.parse(headersInput.value || '{}'); }
  catch { showToast('Headers must be valid JSON.'); document.querySelector('[data-tab="headers"]').click(); return; }
  try { params = JSON.parse(paramsInput.value || '{}'); }
  catch { showToast('Query parameters must be a valid JSON object.'); document.querySelector('[data-tab="params"]').click(); return; }
  if (!headers || Array.isArray(headers) || typeof headers !== 'object' || !params || Array.isArray(params) || typeof params !== 'object') {
    showToast('Headers and query parameters must be JSON objects.'); return;
  }

  const rawUrl = urlInput.value.trim();
  if (!rawUrl) { showToast('Enter a request URL first.'); urlInput.focus(); return; }
  let requestUrl;
  try { requestUrl = new URL(rawUrl, window.location.origin); }
  catch { showToast('Enter a valid URL.'); return; }
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && String(value) !== '') requestUrl.searchParams.set(key, String(value));
  });

  const options = { method: method.value, headers };
  if (['POST', 'PUT', 'PATCH'].includes(method.value)) {
    const body = bodyInput.value.trim();
    if (body) {
      try { JSON.parse(body); }
      catch { showToast('Request body must be valid JSON.'); document.querySelector('[data-tab="body"]').click(); return; }
      options.body = body;
    }
  }

  sendButton.disabled = true;
  sendButton.querySelector('span').textContent = 'Sending…';
  responseCaption.textContent = `${method.value} ${requestUrl.pathname}…`;
  responseMeta.classList.add('hidden');
  responseContent.innerHTML = '<div class="empty-state"><div class="empty-icon">↗</div><strong>Request in progress</strong><span>Waiting for the API response…</span></div>';
  const started = performance.now();
  try {
    const response = await fetch(requestUrl, options);
    const text = await response.text();
    const elapsed = Math.round(performance.now() - started);
    rawResponse = text;
    prettyResponse = true;
    document.querySelectorAll('.response-view').forEach((button, index) => button.classList.toggle('active', index === 0));
    renderResponse();
    responseStatus.textContent = `${response.status} ${response.statusText || ''}`.trim();
    responseStatus.classList.toggle('bad', !response.ok);
    responseTime.textContent = `${elapsed} ms`;
    responseSize.textContent = `${new Blob([text]).size} B`;
    responseMeta.classList.remove('hidden');
    responseCaption.textContent = 'Response received';
    copyButton.disabled = false;
  } catch (error) {
    rawResponse = '';
    lastResponse = JSON.stringify({ error: error.message, hint: 'Check that the API server is running and the URL is reachable.' }, null, 2);
    responseContent.textContent = lastResponse;
    responseCaption.textContent = 'Could not reach the API';
    responseStatus.textContent = 'NETWORK ERROR';
    responseStatus.classList.add('bad');
    responseTime.textContent = `${Math.round(performance.now() - started)} ms`;
    responseSize.textContent = '—';
    responseMeta.classList.remove('hidden');
    copyButton.disabled = false;
  } finally {
    sendButton.disabled = false;
    sendButton.querySelector('span').textContent = 'Send';
  }
}

sendButton.addEventListener('click', sendRequest);
urlInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') sendRequest(); });
document.addEventListener('keydown', (event) => { if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') sendRequest(); });
copyButton.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(lastResponse); showToast('Response copied.'); }
  catch { showToast('Clipboard access is unavailable.'); }
});

document.querySelectorAll('.response-view').forEach((button, index) => button.addEventListener('click', () => {
  prettyResponse = index === 0;
  document.querySelectorAll('.response-view').forEach((item) => item.classList.toggle('active', item === button));
  renderResponse();
}));

async function refreshHealth() {
  const indicator = document.querySelector('#db-indicator');
  const stateLabel = document.querySelector('#db-state');
  const note = document.querySelector('#db-note');
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    const state = data.database?.state || 'unknown';
    stateLabel.textContent = state === 'connected' ? 'MongoDB connected' : `MongoDB ${state}`;
    note.textContent = state === 'connected' ? 'Cloud database is reachable' : 'Set MONGODB_URI on the server';
    indicator.className = `status-indicator ${state === 'connected' ? 'connected' : state === 'disconnected' ? 'disconnected' : ''}`;
  } catch {
    stateLabel.textContent = 'API unavailable';
    note.textContent = 'Could not reach the server';
    indicator.className = 'status-indicator disconnected';
  }
}

document.querySelector('#refresh-health').addEventListener('click', refreshHealth);
method.addEventListener('change', updateMethodState);
updateMethodState();
refreshHealth();
