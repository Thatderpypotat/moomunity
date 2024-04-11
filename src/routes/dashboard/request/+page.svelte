<script lang="ts">
    import { enhance } from "$app/forms";


</script>



<div>
    <form action="?/newRequest" method="post" use:enhance>
        <label for="request">Namn på tjänst:</label>
        <input type="text" id="request" name="request">
        <label for="desc">Kort beskrivnign av tjänst:</label>
        <input type="text" id="desc" name="description">
        <label for="button">Tjänsten ska godkännas av admin innan den kan synas för andra användare</label>
        <button id="button">Skicka in</button>
    </form>
</div>