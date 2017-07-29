

Vue.component('coupon', {
  template: '<input placeholder="enter you coupon code" @blur="onCouponApplied">',
  methods: {
    onCouponApplied(){
      this.$emit('applied');
    }
  }
});


Vue.component('tabs', {
  template: `
    <div>
      <div class="tabs">
        <ul>
          <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
            <a :href="tab.href" @click="selectTab(tab) ">{{ tab.name }}</a>
          </li>
        </ul>
      </div>
      <div class="tabs-details">
        <slot></slot>
      </div>
    </div>
  `,
  data(){
    return { tabs: [] };
  },
  created(){
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectTab){
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name == selectTab.name);
      });
    }
  }
});

Vue.component('tab', {
  template: `
    <div v-show="isActive"><slot></slot></div>
  `,
  props: {
    name: { required:true },
    selected: { default: false }
  },
  data(){
    return {
      isActive: false
    };
  },
  computed: {
    href(){
      return '#' + this.name.toLowerCase().replace(/\s/g, "-");
    }
  },
  mounted(){
    this.isActive = this.selected;
  }
});

Vue.component('modal', {

  template: `
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class="box">
            <slot></slot>
          </div>
        </div>
        <button class="modal-close" @click="$emit('close')">x</button>
      </div>
  `
});

Vue.component('message', {
  props: ['title', 'subtitle'],
  data(){
    return {
      isVisible: true
    };
  },
  template: `
  <div class="tile is-ancestor" v-show="isVisible">
      <div class="tile is-vertical is-8">
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <article class="tile is-child notification is-primary">
              <p class="title">{{title}}</p>
              <button type="button" @click="hideModal">x</button>
              <p class="subtitle">{{subtitle}}</p>
            </article>
          </div>
        </div>
      </div>
      
    </div>
  `,
  methods: {
    hideModal(){
      this.isVisible = false;
    }
  }
});

Vue.component('task-list', {
  template: `
  <div>
    <task v-for="task in tasks">{{task.task}}</task>
  </div> 
  `,
  data(){
    return {
      tasks: [
        {task: 'go vue', completed: true},
        {task: 'eat code sleep', completed: false},
        {task: 'learn vue', completed: true},
        {task: 'vue components', completed: false},
      ]
    };
  }
});

Vue.component('task', {
  template: '<li><slot></slot></li>'
});

new Vue({
  el: '#app',
  data: {
    //showModal: false
    couponApplied: false
  },
  methods:{
    onCouponApplied(){
      this.couponApplied = true;
    }
  }
});

