const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formGroup = input.parentElement; // Get inputs parent element
  formGroup.classList.add('error'); // Add .error class to parent element
  formGroup.childNodes[1].innerText = message; // Find inputs sibling and put message inside
}

// Show input success message
function showSuccess(input) {
  const formGroup = input.parentElement; // Get inputs parent element
  formGroup.classList.add('success'); // Add .success class to parent element
  formGroup.classList.remove('error'); // Remove .error class
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(input).toLowerCase());
  // If email is valid
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach(input => {
    // If input is empty
    if (input.value.trim() == '') {
      showError(input, `${upperCase(input.id)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${upperCase(input.id)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${upperCase(input.id)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check if passwords match
function checkMatch(input1, input2) {
  if (input1.value == input2.value) {
    showSuccess(input2);
  } else {
    showError(input2, 'Passwords do not match');
  }
}

// First Char to Upper Case
function upperCase(input) {
  const firstChar = input[0].toUpperCase(); // First char to upper case
  const otherChar = input.slice(1); // Get other char
  return firstChar.concat(otherChar); // Concat them together
}

// EVENT LISTENERS
form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 2, 20);
  checkLength(password, 6, 30);
  checkEmail(email);
  checkMatch(password, password2);
});
