class TaskList extends HTMLElement {

  constructor() {
    super();

    this.wrapper = document.createElement('section');
    this.wrapper.className = 'wrapper';

    this.form = document.createElement('form');
    this.form.action =''
    this.form.className = 'task_form'

    this.taskInputLabel = document.createElement('label')
    this.taskInputLabel.textContent = 'Задача'

    this.inputTask = document.createElement('input')
    this.inputTask.name = 'name'
    this.inputTask.type = 'text'
    this.inputTask.required = true
    this.inputTask.className = 'input_task'

    this.dateInputLabel = document.createElement('label')
    this.dateInputLabel.textContent = 'Завершить'

    this.inputDate = document.createElement('input')
    this.inputDate.name = 'date'
    this.inputDate.type = 'date'
    this.inputDate.required = true
    this.inputDate.className = 'input_date'

    this.linkCSS = document.createElement('link')
    this.linkCSS.rel = 'stylesheet'
    this.linkCSS.href = './components/task-list/task-list.css'

    this.submitButton = document.createElement('input')
    this.submitButton.type = 'submit'
    this.submitButton.value = 'Добавить'
    this.submitButton.className = 'submit_button'

    this.formatter = new Intl.DateTimeFormat( 'ru', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    })

    this.form.onsubmit = (e) => {
      e.preventDefault()
      let date = Date.parse(this.inputDate.value)
      let newRow = document.createElement('tr')
      newRow.innerHTML = `
        <td>${this.inputTask.value}</td>
        <td>До: ${this.formatter.format(date)}</td>
      `
      
      let switchButtonCell = document.createElement('td')
      let switchButton = document.createElement('img')
      switchButton.src = './components/task-list/images/off.svg'
      switchButton.className = 'switch_button'


      switchButtonCell.append(switchButton)
      newRow.append(switchButtonCell)

      let delButton = document.createElement('td')
      delButton.className = 'delete_button'
      delButton.innerHTML = `<img src="components/task-list/images/delete.png" alt="Delete icon" width="22">`
      delButton.onclick = (e) => {
        newRow.remove()
      }
      newRow.append(delButton)
      this.taskTableBody.append(newRow)
      switchButton.onclick = (e) => {
        if (switchButton.src.endsWith('off.svg')) {
          switchButton.src = './components/task-list/images/on.svg'
        } else {
          switchButton.src = './components/task-list/images/off.svg'
        }
      }
      this.inputTask.value = null
      
    }



    this.taskTable = document.createElement('table');
    this.taskTableBody = document.createElement('tbody')
    this.taskTable.append(this.taskTableBody)

    
  }


  connectedCallback() {
    this.taskInputLabel.append(this.inputTask)
    this.dateInputLabel.append(this.inputDate)
    this.form.append(this.taskInputLabel, this.dateInputLabel, this.submitButton)
    this.wrapper.append(this.form, this.taskTable)
    const shadow = this.attachShadow({mode: 'open'});
    shadow.append(this.linkCSS, this.wrapper)
  }
}

customElements.define('task-list', TaskList);
