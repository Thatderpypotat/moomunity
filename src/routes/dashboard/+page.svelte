<script lang="ts">
    import { browser } from '$app/environment';
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    export let data;

    browser? setInterval(invalidateAll,1000):null;
</script>


<nav>
    <a href="/dashboard/request">Skapa en ny tjänst</a>
</nav>

<div>
{#each data.tjansts as tjansti}
    <div class="bib">
        <h2>{tjansti.name}</h2>
        <p>{tjansti.desc}</p>
        <p>{tjansti.likes}</p>
        <form method="post" action="?/like" use:enhance>
            <button>like</button>
            <input type="hidden" name="tjunstName" value={tjansti.name}>
        </form>
        <form action="?/leverera" method="post" use:enhance>
            <button>leverera</button>
            <input type="hidden" name="tjunstName" value={tjansti.name}>
        </form>
    </div>
{/each}

</div>

<style>
    .bib{
        margin-top: 20px;
        border: 2px solid black;
        background-color: aliceblue;
    }
    nav{
        height: 50px;
        width: 100%;
        display: block;
        background-color: black;
    }
    h2, p{
    color: black;
    }
    button{
        height: 20px;
        width: 40px;
        background-color:antiquewhite;
    }
</style>