<template>
    <div>
        <h-nav></h-nav>
    </div>
</template>

<script>

import HNav from "../components/common/HNav";

export default {
    name: "app",
    data() {
        return {
            
        };
    },
    components: {
        HNav
    },
    mounted() {
        
    },
    methods: {
        

    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');

#link-to-home{
    color:rgb(83,71,122);
}

#link-to-entrance, #link-to-admin, #link-to-board{
    color: white;

}

.banner{
    height:500px;
    background: linear-gradient( to right, rgb(236,222,227), rgb(204,234,238) );
}
#service{
    font-family: 'Archivo Black', sans-serif;
    font-size:38px;
    padding-top: 200px;
}

</style>