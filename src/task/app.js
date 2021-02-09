require('./task.css');
const { store$ } = require('./store');
const { addTaskAsync, loadTasksAsync } = require('./task-client');

const form = document.querySelector('#task-form');
const list = document.querySelector('#task-list');
const inputFile = document.querySelector('#attachment');
const inputName = document.querySelector('#name');

form.onsubmit = (event) => {
  event.preventDefault();

  const data = taskForm();
  store$.dispatch(addTaskAsync(data));
};

function taskForm() {
  const formData = new FormData();

  formData.append('name', inputName.value);
  formData.append('attachment', inputFile.files[0]);
  formData.append('assigneeId', '1'); // masih hardcode
  return formData;
}

store$.subscribe(() => {
  const state = store$.getState();
  console.log(state);
  render(state);
});

function render(state) {
  console.log(list);
  let result = '';
  for (const data of state) {
    const li = document.createElement('li');
    li.innerText = data.name;
    console.log(li);
    list.append(li);
  }
}

store$.dispatch(loadTasksAsync);
