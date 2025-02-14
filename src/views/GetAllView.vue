<template>
    <h1>Növények kiírása</h1>
    <table class="table table-striped">
        <thead>
            <tr>
            <th>Neve</th>
            <th>Évelő-e</th>
            <th>Kategória</th>
            <th>Ára</th>
        </tr>
        </thead>
        <tbody v-for="plant in plants">
            <tr><td>{{ plant.name }}</td>
            <td>{{ plant.perennial ? "Igen" : "Nem" }}</td>
            <td>{{ plant.category }}</td>
            <td>{{ plant.price}}</td>
            <button class="btn btn-danger">Törlés</button>
        </tr>
        </tbody>
    </table>
</template>

<script setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { onMounted, ref } from 'vue';

onMounted(() => {
    getAllPlants()
})

let plants = ref([])
const getAllPlants = async() =>{
    const response = await axios.get('http://localhost:3000/plants')
    plants = response.data
}
</script>