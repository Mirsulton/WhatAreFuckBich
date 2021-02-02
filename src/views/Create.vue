<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Проект</h1>
      <form @submit.prevent="submitHandler">

        <div class="input-field ">
          <input id="title" v-model="title" type="text" class="validate" required>
          <label for="title">Название</label>
          <span class="helper-text" data-error="Title is required" data-success="right">Helper text</span>

        </div>

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
          <textarea v-model="description" id="description" class="materialize-textarea" data-length="2048"></textarea>
          <label for="description">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{ description.length }}/2048</span>
        </div>

        <div class="input-field ">
        <input id="dataStart" v-model="dataStart"  type="date" class="validate" required>
        <label for="dataStart">Дата окончания</label>
        <span class="helper-text" data-error="Title is required" data-success="right">Helper text</span>

      </div>

        <div class="input-field ">
          <input type="text" ref="datepicker">
          <label for="dataStart">Дата добавления</label>
          <span class="helper-text" data-error="Title is required" data-success="right">Helper text</span>

        </div>
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






        <button class="btn" type="submit">Creat task</button>
      </form>
    </div>




  </div>
</template>

<script>

export default {
  name: 'create',
  data: () => ({
    description: '',
    title: '',
    customer: '',
    typeProject: '',
    dataStart: '',
    date: null,
    isFavorite: false,



  }),
  mounted() {
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true,
    });
  },
  methods: {
    submitHandler() {
      const task = {
        title: this.title,
        description: this.description,
        customer: this.customer,
        typeProject: this.typeProject,
        dataStart: this.dataStart,
        id: Date.now(),
        date: this.date.date,
        isFavorite: this.isFavorite,



      }
      this.$store.dispatch('createTask', task)
      this.$router.push('/list')
    }
  },
  destroyed() {
    if (this.date && this.date.destroy) {
      this.date.destroy()
    }
  }
}
</script>
<style scoped>
.favorite {
  color: gold;
}
</style>
