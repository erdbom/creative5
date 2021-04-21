<template>
<div>
    <div class="wrapper">
        <div class="itinerary">
            <h2 v-if="user">{{user.firstName}} {{user.lastName}}'s Dream Vacation! <a @click="logout"><strong>Logout</strong></a></h2>
            <div class="base" v-show="this.itinerary.length === 0 && !user">
                <p>No Itinerary, add a location!</p>
            </div>
            <div class="itineraryitem" v-for="(item, index) in this.itinerary" :key="item._id">
                <div class="image">
                    <div>
                        <img :src="'/images/' + item.image">
                    </div>
                    <div>
                        <p>{{item.name}}, ${{item.price}}</p>
                    </div>
                </div>
                <div class="info">
                    
                    <h2>Activities:</h2>
                    <div class="activity" v-for="(activity, index) in item.activities" :key="activity">
                        <p>{{activity}}</p>
                        <div class="space"></div>
                        <button v-on:click="removeActivity(item, index)">X</button>
                    </div>
                </div>
                <div class="formwrap">
                    <form class="form">
                        <input v-model="message" placeholder="add activity">
                        <button v-on:click.prevent="addActivity(item, message)">Add Activity</button>
                    </form>
                    <button v-on:click="deleteItem(item, index)" class="delete">Remove from Itinerary</button>
                </div>
            </div>
        </div>
    </div>
    <div class="total" v-show="this.itinerary.length !== 0">
            <h1>Total:</h1>
            <p>${{total}}</p>
            <p>Have fun on your dream vacation!</p>
    </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Itinerary",
    data() {
        return {
            itinerary: [],
        }
    },
    computed: {
        user() {
            return this.$root.$data.user
        },
        total() {
            return this.getTotal()
        }
    },
    created() {
        this.getItinerary();
    },
    methods: {
        async deleteItem(item, index) {
            try {
                item.isInItinerary = false;
                this.$root.$data.locations[index].isInItinerary = false;
                await axios.delete("/api/itinerary/" + item._id);
                this.getItinerary();
            }
            catch (error) {
                //console.log(error);
            }
        },
        async getItinerary() {
            try {
                let response = await axios.get("/api/itinerary");
                this.itinerary = response.data;
                
            }
            catch (error) {
                //console.log(error);
            }
        },
        async update(item) {
            try {
                await axios.put('/api/itinerary/' + item._id, {
                    activities: item.activities
                });
                this.getItinerary();
            }
            catch (error) {
                //console.log(error);
            }
        },
        addActivity(item, message) {
            item.activities.push(message)
            this.message = ""
            this.update(item);
        },
        removeActivity(item, index) {
            item.activities.splice(index, 1);
            this.update(item);
        },
        async logout() {
            try {
                await axios.delete("/api/users");
                this.$root.$data.user = null;
                this.itinerary = [];
            } catch (error) {
                this.$root.$data.user = null;
            }
        },
        getTotal() {
            if (this.itenerary === []) {
                return 0;
            }
            else {
                return this.itinerary.reduce((prev, cur) => {
                    return prev + cur.price;
                }, 0);
            }
        },
    },
}
</script>

<style scoped>
    .wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .itinerary {
        width: 100%;
        margin-top: 20px;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
    }

    .itineraryitem {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        margin: 10px;
        width: 100%;
        background-color: lightskyblue;
    }

    .itinerary img {
        border: 2px solid #333;
        height: 150px;
        width: 100px;
        object-fit: cover;
        margin-right: 10px;
        margin-top: 5px;
    }

    .itinerary .image {
    display: flex;
    justify-content: center;
    margin: 5px;
    }
    .image, .info, .formwrap {
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
    }

    .base {
        padding: 300px;
        align-items: center;
        text-align: center;
        background-color: lightskyblue;
        font-size: 30px;
        margin-bottom: 20px;
    }
    .activity {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
    .space {
        width: 10px;
    }
    .image {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        font-size: 20px;
    }
    .form {
        margin-bottom: 30px;
    }
    .total {
        background-color: #12c6cc;
        margin-bottom: 20px;
        margin-top: 10px;
    }
    @media screen and (max-width: 600px) {
        .itineraryitem {
            flex-direction: column;
        }
    }
</style>