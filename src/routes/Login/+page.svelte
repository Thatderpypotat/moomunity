<script lang="ts">
    import { enhance } from '$app/forms';
    import type { PageData } from './$types';
    
    //export let data: PageData;
</script>



<div>
    <h1>Login:</h1>
    <div>
        <form action="login" method="post" use:enhance>
            <label for="username">Användarnamn:</label>
            <input id="username" type="text" name="UserName">
            <label for="pass">Lösenord:</label>
            <input id="pass" type="password" name="Password">
        </form>
    </div>
</div>

