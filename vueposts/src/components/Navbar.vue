<template>
  <nav>
      <v-app-bar dark app>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-toolbar-title class="text-uppercase yellow--text">
            Imran's<span class="font-weight-light">Mind</span>Admin
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn @click="newPostDialog = true" text>New Post</v-btn>
        </v-toolbar-items>
      </v-app-bar>
      <v-dialog v-model="newPostDialog" width="768" persistent>
             <v-card>
                 <v-card-title class="grey darken-4 white--text headline"> New Post
                 </v-card-title>
                <v-card-text>
                   <v-container fluid grid-list-xl>
                       <v-layout wrap>
                           <v-flex xs-12 md6>
                               <v-text-field label="Title"  v-model="newPost.title" />
                           </v-flex>
                           <v-flex xs12 md6>
                               <v-text-field label="Author" v-model="newPost.author" />
                           </v-flex>
                           <v-flex xs12>
                               <v-textarea label="Content" v-model="newPost.content" />
                           </v-flex>
                       </v-layout>
                   </v-container>
                </v-card-text>
                <v-card-actions class="grey darken-4">
                    <v-btn @click="newPostDialog = false" text color="grey">Close</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="addPost" text color="yellow">Add Post</v-btn>
                </v-card-actions>
             </v-card>
      </v-dialog>
      <v-navigation-drawer v-model="drawer" class="grey darken-4" app >
          <h2 class="headline white--text">Hi there</h2>
      </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
 name: "Navbar",
 data () {
     return {
         drawer: false,
         newPostDialog: false,
         newPost: {},
         
     }
 },
 methods: {
     addPost () {
         let payload = {
             title: this.newPost.title,
             author: this.newPost.author,
             content: this.newPost.content
         }

         fetch("http://localhost:3000/api/post/new", {
             method: "POST",
             headers: {
                 "content-type": "application/json"
             },
             body: JSON.stringify(payload)
         })
         .then(data => {
             return data.json()
         })
         .then(json => {
             this.$emit("newPost", json.result)
             this.newPostDialog = false
             this.newPost = {}
         })
     }
 }
}
</script>

<style>

</style>