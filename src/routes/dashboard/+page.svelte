<script lang="ts">
    import { enhance } from '$app/forms';
</script>


<nav>
    <p>hi</p>
    <form action="?/nyide" method="post" use:enhance>
        <button>Skapa en ny idé för tjänst</button>
    </form>
    
</nav>

<div>


</div>

<style>
    nav{
        height: 50px;
        width: 100%;
        display: block;
        background-color: black;
    }
</style>