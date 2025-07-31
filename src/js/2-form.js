

const formData = {
    email: "",
    message: "",
}

const form = document.querySelector('.feedback-form');

form.addEventListener("input", (e) => {
  const { name, value } = e.target;

  if (name in formData) {
    formData[name] = value.trim();
    saveToLS('feedback-form-state', formData);
  }
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data;
  } catch {
    console.log( 'ERROR PARSING' );
    return defaultValue || jsonData;
  }
}


document.addEventListener("DOMContentLoaded", () => {
  
  const saved = getFromLS('feedback-form-state',{ email: "",
  message:"",})


formData.email = saved.email;
formData.message = saved.message;

form.elements.email.value = saved.email;
form.elements.message.value = saved.message;

});

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {

  e.preventDefault();

  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  
  if(email === "" || message === ""){
    return console.log("Please fill in all the fields!");
    
  } else if (email.endsWith('.ru')){
    return console.log('not allowed!');
    
  }

  console.log(formData);
    localStorage.removeItem('feedback-form-state');
  form.reset();
  formData.email = "";
  formData.message = "";
}


