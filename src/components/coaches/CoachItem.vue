<template>
    <li>
        <h3>{{fullName}}</h3>
        <h4>$ {{rate}}/hour</h4>
    </li>
    <div>
        <span v-for="area in areas" :key="area">{{area}}</span>
    </div>
    <div class="actions">
        <router-link to="#">Contact</router-link>
        <router-link to="#">View Details</router-link>
    </div>
</template>

<script>
export default {
    props: ['id', 'firstName', 'Lastname', 'rate', 'areas'],
    computed: {
        fullName: () => {
            return `${this.firstName} ${this.lastName}`;
        },
    }
}
</script>