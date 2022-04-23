const App = {
  data() {
    return {
      // 追加
      task: {title: ''},
      tasks: [],
    }
  },
  compilerOptions: {
    delimiters: ['[[', ']]'],
  },
  methods: {
    getTasks(){
      fetch(URL, {
        method: 'get',
        headers: {
          'Content-Type':  'application/json',
        },
      })
      .then((response) => {
        return response.json();
      })
      .then((tasks_list) => {
        this.tasks = tasks_list;
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
    },
    // 追加
    createTask(){
      // csrfトークンを定義
      const csrftoken = Cookies.get('csrftoken');
      // taskリストを取得する
      this.getTasks();
      fetch(URL, {
        method: 'post',
        headers: {
          'Content-Type':  'application/json',
          'X-CSRFToken': csrftoken,
        },
        // htmlから入力されたtaskの情報をviews.pyに送信
        body:JSON.stringify(this.task),
      })
      .then((response) => {
        return response.json();
      })
      .then((task) => {
        console.log(task)
        // タイトルを空にする
        this.task.title = ''
        this.getTasks();
      })
      .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
      });
    },
  },
  created() {
    this.getTasks();
  },
}

Vue.createApp(App).mount('#app')