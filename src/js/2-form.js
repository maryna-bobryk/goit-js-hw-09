const LS_KEY = 'feedback-form-state';

const refs = {
  formElem: document.querySelector('.feedback-form'),
};

//!================================================================

refs.formElem.addEventListener('input', e => {
  const email = e.currentTarget.elements.email.value.trim();
  const message = e.currentTarget.elements.message.value.trim();

  const formData = { email, message };
  saveToLS(LS_KEY, formData);
});

function initPage() {
  const data = loadFromLS(LS_KEY);
  refs.formElem.elements.email.value = data?.email || '';
  refs.formElem.elements.message.value = data?.message || '';
}
initPage();

//!================================================================

refs.formElem.addEventListener('submit', e => {
  e.preventDefault();

  const email = e.currentTarget.elements.email.value;
  const message = e.currentTarget.elements.message.value;
  const formData = { email, message };
  if (!email || !message) {
    alert('Please fill in all form fields before submitting.');
    return;
  }

  console.log(formData);
  e.target.reset();
  localStorage.removeItem(LS_KEY);
});

//!================================================================
function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const body = localStorage.getItem(key);
  try {
    const data = JSON.parse(body);
    return data;
  } catch {
    return body;
  }
}
