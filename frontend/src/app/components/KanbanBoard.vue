<template>
	<div class="kanban-board">>
		<div class="row">
			<h3 class="header orange">On Hold ({{ items0.length }})</h3>
			<Container :group-name="'1'" :get-child-payload="getChildPayload0" @drop="onDrop('items0', $event)">
				<Draggable v-for="item in items0" :key="item.id">
					<div v-if="item.owner === user.pk" class="draggable-item">
						<div class="delete" @click="deleteItem('items0', item)"></div>
						<p><b class="id">id: </b>{{ item.id }}</p>
						<p>{{ item.description }}</p>
					</div>
				</Draggable>
			</Container>
			<textarea id="title0" class="card-title-textarea" rows="5" placeholder="Ввести заголовок для этой карточки" v-model="newCardHeader" v-bind:style="addACardStyle[0]"></textarea>
			<button class="add-a-card" @click="addItem('items0')" v-bind:style="addACardStyle[0]">Добавить карточку</button>
			<button class="cancel" @click="hideAddACardTextarea()" v-bind:style="addACardStyle[0]"></button>
			<button class="add-another-card" @click="showAddACardTextarea(0)" v-bind:style="addAnotherCardStyle[0]">Добавить карточку</button>
		</div>
		<div class="row">
			<h3 class="header blue">In Progress ({{items1.length}})</h3>
			<Container :group-name="'1'" :get-child-payload="getChildPayload1" @drop="onDrop('items1', $event)">
				<Draggable v-for="item in items1" :key="item.id">
					<div v-if="item.owner === user.pk" class="draggable-item">
						<div class="delete" @click="deleteItem('items1', item)"></div>
						<p><b class="id">id: </b>{{item.id}}</p>
						<p>{{item.description}}</p>
					</div>
				</Draggable>
			</Container>
			<textarea id="title1" class="card-title-textarea" rows="5" placeholder="Ввести заголовок для этой карточки" v-model="newCardHeader" v-bind:style="addACardStyle[1]"></textarea>
			<button class="add-a-card" @click="addItem('items1')" v-bind:style="addACardStyle[1]">Добавить карточку</button>
			<button class="cancel" @click="hideAddACardTextarea()" v-bind:style="addACardStyle[1]"></button>
			<button class="add-another-card" @click="showAddACardTextarea(1)" v-bind:style="addAnotherCardStyle[1]">Добавить карточку</button>
		</div>
		<div class="row">
			<h3 class="header yellow">Needs Review ({{items2.length}})</h3>
			<Container :group-name="'1'" :get-child-payload="getChildPayload2" @drop="onDrop('items2', $event)">
				<Draggable v-for="item in items2" :key="item.id">
					<div v-if="item.owner === user.pk" class="draggable-item">
						<div class="delete" @click="deleteItem('items2', item)"></div>
						<p><b class="id">id: </b>{{item.id}}</p>
						<p>{{item.description}}</p>
					</div>
				</Draggable>
			</Container>
			<textarea id="title2" class="card-title-textarea" rows="5" placeholder="Ввести заголовок для этой карточки" v-model="newCardHeader" v-bind:style="addACardStyle[2]"></textarea>
			<button class="add-a-card" @click="addItem('items2')" v-bind:style="addACardStyle[2]">Добавить карточку</button>
			<button class="cancel" @click="hideAddACardTextarea()" v-bind:style="addACardStyle[2]"></button>
			<button class="add-another-card" @click="showAddACardTextarea(2)" v-bind:style="addAnotherCardStyle[2]">Добавить карточку</button>
		</div>
		<div class="row">
			<h3 class="header green">Approved ({{items3.length}})</h3>
			<Container :group-name="'1'" :get-child-payload="getChildPayload3" @drop="onDrop('items3', $event)">
				<Draggable v-for="item in items3" :key="item.id">
					<div v-if="item.owner === user.pk" class="draggable-item">
						<div class="delete" @click="deleteItem('items3', item)"></div>
						<p><b class="id">id: </b>{{item.id}}</p>
						<p>{{item.description}}</p>
					</div>
				</Draggable>
			</Container>
			<textarea id="title3" class="card-title-textarea" rows="5" placeholder="Ввести заголовок для этой карточки" v-model="newCardHeader" v-bind:style="addACardStyle[3]"></textarea>
			<button class="add-a-card" @click="addItem('items3')" v-bind:style="addACardStyle[3]">Добавить карточку</button>
			<button class="cancel" @click="hideAddACardTextarea()" v-bind:style="addACardStyle[3]"></button>
			<button class="add-another-card" @click="showAddACardTextarea(3)" v-bind:style="addAnotherCardStyle[3]">Добавить карточку</button>
		</div>
	</div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
import { applyDrag, loadItems, saveItems, getItems } from "./utils";
import axios from 'axios';

const BASE_API_URL = 'http://localhost:8000/api';

export default {
	name: "KanbanBoard",
	components: { Container, Draggable },
  props: ['user'],
	data: function() {
		return {
			items0: loadItems('items0'),
			items1: loadItems('items1'),
			items2: loadItems('items2'),
			items3: loadItems('items3'),
			newCardHeader: '',
      // id: this.$cookies.get('task_id'),
			addACardStyle: [
					{ display: 'none'},
					{ display: 'none'},
					{ display: 'none'},
					{ display: 'none'}
				],
			addAnotherCardStyle: [
					{ display: 'block'},
					{ display: 'block'},
					{ display: 'block'},
					{ display: 'block'}
				]
		};
	},
	methods: {
		onDrop: function(collection, dropResult) {
			this.hideAddACardTextarea();
      this[collection] = applyDrag(this[collection], dropResult, collection);
			saveItems(collection, this[collection]);

      function byField(field) {
        return (a, b) => a[field] > b[field] ? 1 : -1;
      }

			this.items0.sort(byField('id'));
      this.items1.sort(byField('id'));
      this.items2.sort(byField('id'));
      this.items3.sort(byField('id'));


      const jwt = this.$cookies.get('jwt_token');
      const id =  localStorage.getItem('item_id')

      const requestData = {
        column: localStorage.getItem('to_column'),
      };
      axios.patch(`${BASE_API_URL}/tasks/${id}/`, requestData, { headers: {
          Authorization: `JWT ${jwt}`}
      },)
		},
		getChildPayload0: function(index) {
        return this.items0[index];
		},
		getChildPayload1: function(index) {
        return this.items1[index];
    },
		getChildPayload2: function(index) {
        return this.items2[index];
		},
		getChildPayload3: function(index) {
        return this.items3[index];
		},
		addItem: function(collection) {
			if (this.newCardHeader) {
        const jwt = this.$cookies.get('jwt_token');
				const user_pk = this.user.pk;
				const column = Number(collection.split('items')[1]) + 1;
				const description = this.newCardHeader;

        const requestData = {
          description: description,
          owner: user_pk,
          column: column,
        };

        axios.post(`${BASE_API_URL}/tasks/`, requestData, { headers: {
          Authorization: `JWT ${jwt}`,
        },})
          .then((response) => {
            this[collection].push({ id: response.data.id, description: this.newCardHeader, owner: this.user.pk, column: response.data.column });
            saveItems(collection, this[collection]);
            this.hideAddACardTextarea();
          });
			}
		},
		deleteItem: function(collection, item) {
      const jwt = this.$cookies.get('jwt_token');
		  const id = item.id

			let index = this[collection].map(x => {
				return x.id;
			}).indexOf(item.id);
			this[collection].splice(index, 1);
			saveItems(collection, this[collection]);


      axios.delete(`${BASE_API_URL}/tasks/` + id, { headers: {
          Authorization: `JWT ${jwt}`,
        },})
		},
		hideAddACardTextarea: function() {
			this.newCardHeader = '';
			for(let i = 0; i < this.addACardStyle.length; i++) {
				this.addACardStyle[i].display = 'none';
			}
			for(let i = 0; i < this.addAnotherCardStyle.length; i++) {
				this.addAnotherCardStyle[i].display = 'block';
			}
		},
		showAddACardTextarea: function(col) {
			this.hideAddACardTextarea();
			this.addAnotherCardStyle[col].display = 'none';
			this.addACardStyle[col].display = 'block';
			let textareaID = 'title' + col;

			setTimeout(function() {
				document.getElementById(textareaID).focus();
			}, 0);
		},
	},
  mounted() {
    const jwt = this.$cookies.get('jwt_token');
	  getItems(jwt);
  }
};
</script>
