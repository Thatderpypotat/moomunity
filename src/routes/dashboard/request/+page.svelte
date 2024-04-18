<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageData } from "./$types";
    export let data;
</script>



<div>
    <form action="?/newRequest" method="post" use:enhance>
        <label for="request">Namn på tjänst:</label>
        <input type="text" id="request" name="request">
        <label for="desc">Kort beskrivnign av tjänst:</label>
        <input type="text" id="desc" name="description">
        {#if data.isAdmin}
            <input type="checkbox" name="accepted" id="accepted">
        {/if}
        <label for="button">Tjänsten ska godkännas av admin innan den kan synas för andra användare</label>
        <button id="button">Skicka in</button>
    </form>
</div>


{#if data.isAdmin}
    <div>
        {#each data.tjansts as tjunst}
            <div class="special">
                <form action="/?acceeeept" method="post" use:enhance>
                    <h2>{tjunst.name}</h2>
                    <input type="hidden" name="me" value={tjunst.name}>
                    <input type="checkbox" name="acceeeept" id="acceeeept">
                </form>
            </div>
        {/each}
    </div>
{/if}