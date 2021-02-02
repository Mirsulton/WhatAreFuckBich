<template>
  <div class="row">
    <div v-if="task" class="col s6 offset-s3">
      <h1>{{task.title}}</h1>

      <form @submit.prevent="submitHandler">

        <div class="input-field ">
          <input id="customer" v-model="customer" type="text" class="validate" required>
          <label for="customer">Заказчик</label>
          <span class="helper-text" data-error="Title is required" data-success="right">Helper text</span>

        </div>

        <div class="input-field ">
          <input id="typeProject" v-model="typeProject"  type="text" class="validate" required>
          <label for="typeProject">Тип проекта</label>
          <span class="helper-text" data-error="Title is required" data-success="right">Helper text</span>

        </div>




        <div class="input-field">
          <textarea style="min-height: 150px" v-model="description" id="description" class="materialize-textarea" data-length="2048"></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{ description.length }}/2048</span>
        </div>

        <div class="input-field ">
          <input id="dataStart" v-model="dataStart"  type="date" class="validate" required>
          <label for="dataStart">Дата добавления</label>
          <span class="helper-text" data-error="Title is required" data-success="right">Helper text</span>

        </div>


        <input type="text" ref="datepicker">

        <div class="input-field ">
          <div

              style="position: absolute; right: 0; color: grey"
          >
            Избранный:
            <i


                v-bind:class="{favorite:  isFavorite}"
                v-on:click="isFavorite =!isFavorite"
                class="material-icons small"
            >favorite</i></div>

        </div>

        <div >
          <button class="btn" style="margin-right: 1rem;" type="submit">Update</button>

        </div>
      </form>
    </div>

    <p v-else>Task not found</p>
  </div>


</template>

<script>
export default {
  computed: {
    task() {
      console.log(this.$route.params.id)
      return this.$store.getters.taskById(+this.$route.params.id)

    }
  },

  data: () => ({
    description: '',
    customer: '',
    typeProject: '',
    dataStart:'',
    isFavorite: false,
    date: null,
  }),
  mounted() {
    this.description = this.task.description,
    this.customer = this.task.customer,
    this.typeProject = this.task.typeProject,
    this.dataStart = this.task.dataStart,
    this.isFavorite = this.task.isFavorite,


    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(this.task.date),
      setDefaultDate: true,
    })
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  methods: {
    submitHandler() {
      this.$store.dispatch('updateTask', {
        id: this.task.id,
        description: this.description,
        customer: this.customer,
        typeProject: this.typeProject,
        dataStart: this.dataStart,
        isFavorite: this.isFavorite,
        date: this.date.date
      })
      this.$router.push('/list')
    },

  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy()
    }
  },
  name: "task"
}
</script>

<style scoped>

.favorite {
  color: gold;
}

</style>