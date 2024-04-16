<script lang="ts">
    import { enhance } from '$app/forms';
        
    //export let data: PageData;
    export let form;
</script>

<h1>Här kan du registrera:</h1>

<div class="reg">
<form method="post" action="?/create" use:enhance>
    <div>
        <label for="namn">Ditt användarnamn</label>
        <input id="namn" type="text" name="new_user">
        <label for="passW">Ditt lösenord</label>
        <input id="passW" type="password" name="new_pass">
        <select name="lev" id="öev">
            <option value="{true}">Leverantör</option>
            <option value="{false}">Vanlig bybo</option>
        </select>
    </div>
    <div>
        <label for="personNamn">Ditt namn</label>
        <input type="text" id="personNamn" name="personNamn">
        <label for="personEfternamn">Ditt Efternamn</label>
        <input type="text" id="personEfternamn" name="personEfternamn">
        <label for="age">Din ålder</label>
        <input type="number" id="age" name="age" min=15 max=100>
        <label for="gender">Ditt namn</label>
        <select name="gender" id="gender">
            <option value="female">Kvinna</option>
            <option value="male">Man</option>
            <option value="other">other</option>
        </select>
    </div>
    <button>Skapa användare</button>
    {#if form?.error}
        <span style="color: red;">{form.error}</span>
    {/if}
</form>
<div>
    <button class="button"><a href="/">Back</a></button>
</div>
</div>


<style>
button{
    height: 50px;
    width: 90px;
    margin-top: 10px;
    background-color:blueviolet;
}
.button{
    height: 30px;
    width: 70px;
}
input, option, select{
    color: black;
}
</style>