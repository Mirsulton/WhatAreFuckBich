<template>
  <div>

    <div class="row" style="    margin-bottom: 0;">
      <div class="input-field s3 col">
        <select ref="select"  v-model="sortType">
          <option value="" disabled selected>По дате(новое)</option>
          <option value="qwe">По дате(новое)</option>
          <option value="ewq">По дате(Старое)</option>
          <option value="wqe">Отобразить избранные</option>
          <option value="asd">Все</option>



        </select>



      </div>
      <div class="s1 col gud">
      <button class="waves-effect waves-light btn gud"
          v-on:click="toggleClass"
      >Карта</button>
      </div>
      <div class="s1 col gud">
      <button class="waves-effect waves-light btn gud"
          v-on:click="toggleClass2"
      >список</button>
      </div>
      <div class="s7 col gud">
        <router-link

            to="/"
            exact active-class="active"
        >
          <a class="waves-effect waves-light btn gud"



          >Создать</a>
        </router-link>
      </div>
    </div>








    <div class="row" v-if="tasks.length"
    >
      <div v-bind:class="{col:  isActive}"
           v-for="(task, idx) of sortItem"
           :key="task.data"
           :task="task"


      >

        <div class="card horizontal">

          <div class="card-stacked"

          >
            <ul v-bind:class="{flex:  hasError}">
              <li

                  style="position: absolute; right: 0px; color: grey"
              >
                <i


                  v-bind:class="{favorite:  task.isFavorite}"

                  class="material-icons small"
              >favorite</i></li>
              <li class="card-content" style="background-color: cadetblue">

                <p>{{ task.title}}</p>
                <span >Проект был задуман как</span>



              </li>

              <li class="card-title" style="font-size: 20px; text-align: center;"> {{new Date(task.date).toLocaleDateString()}} - {{new Date(task.dataStart).toLocaleDateString()}} </li>

              <li>
                <td>Файлы</td>
                <td class="tdStyle">3</td>
              </li>
              <li>
                <td>Заказчик</td>
                <td class="tdStyle">{{ task.customer }}</td>
              </li>
              <li>
                <td>Тип проекта:</td>
                <td class="tdStyle">{{ task.typeProject }}</td>
              </li>

              <li>
                <td>
                  <router-link tag="button" class="btn btn-small" :to="'/task/' + task.id">
                    Редактировать
                  </router-link>
                </td>
                <td>
                  <button tag="button" class="btn btn-small red darken-4"  v-on:click.prevent="removeTask(idx)">Удалить</button>
                </td>
              </li>
            </ul>






          </div>
        </div>
      </div>
    </div>

    <p  v-else>No tasks</p>






  </div>

</template>

<script>
export default {
  name: "List",
  data() {


    return {
      sortType: '',
      isActive: true,
      hasError: false,




    }
  },




  computed: {

    tasks() {
      return this.$store.getters.tasks
    },


    sortItem() {
      let sortType = 1


      if (this.sortType === 'ewq') {
        return this.tasks.slice().sort((prev, curr) => Date.parse(curr.date) - Date.parse(prev.date));
      }

      if (this.sortType === 'qwe') {
        return this.tasks.slice().sort((prev, curr) => Date.parse(prev.date) - Date.parse(curr.date));
      }

      if (this.sortType   === 'wqe') {

        return this.tasks.toggle(this.tasks.filter(t => t.isFavorite))

      }
      if (this.sortType   === 'asd') {

        return this.tasks


      }
      return this.tasks
    },



  },

  methods: {

    removeTask(idx) {

      this.$store.dispatch('removeTask', idx)

    },

    toggleClass(e) {
      this.isActive = true
      this.hasError = false

    },
    toggleClass2(e) {
      this.isActive = false
      this.hasError = true

    }

  },
  mounted() {
    M.FormSelect.init(this.$refs.select)
  },

}




</script>

<style scoped>
.gud {
  text-align: right;
  background-color: white!important;
  color: black;
  margin-top: 12px!important;
}
.td {
  max-width: 400px;
}
.text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.fuck {
  display: inline!important;
}
ul {
  list-style-type: none;
  margin: 0;

}
li {
  margin: auto;
}
td {
  width: 100%;
}

.card-content {
  flex-grow: 0!important;
}

.flex {
  display: inline-flex;
}
.card-content {
  margin-right: 0;
  margin-left: 0;
  padding: 24px 30px;
}
.favorite {
  color: gold;
}

</style>