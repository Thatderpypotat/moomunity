<script lang="ts">
    import { enhance } from '$app/forms';
    export let form;
    
</script>



<div>
    <h1>Login:</h1>
    <div>
        <form action="?/login" method="post" use:enhance>
            <label for="username">Användarnamn:</label>
            <input id="username" type="text" name="UserName">
            <label for="pass">Lösenord:</label>
            <input id="pass" type="password" name="Password">
            {#if form?.form_password,form?.form_username}
				<span style="color: red;">{form.form_password, form.form_username}</span>
			{/if}
            <button>Logga in</button>
        </form>
    </div>
    <div>
        <button><a href="/">Back</a></button>
    </div>
</div>

<style>
    button{
        display: block;
        height: 30px;
        width: 70px;
        margin-top: 10px;
        background-color:blueviolet;
    }
    input{
    color: black;
}
</style>