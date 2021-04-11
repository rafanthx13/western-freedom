<template>
    <div class='container'>
        <div class='box mx-5 my-3'>
            <section>
                <b-field label="Name">
                    <b-input v-model="name"></b-input>
                </b-field>

                <b-field label="Email"
                    type="is-danger"
                    message="This email is invalid">
                    <b-input type="email"
                        value="john@"
                        maxlength="30">
                    </b-input>
                </b-field>

                <b-field label="Username"
                    type="is-success"
                    message="This username is available">
                    <b-input value="johnsilver" maxlength="30"></b-input>
                </b-field>

                <b-field label="Password">
                    <b-input type="password"
                        value="iwantmytreasure"
                        password-reveal>
                    </b-input>
                </b-field>

                <b-field label="Message">
                    <b-input maxlength="200" type="textarea"></b-input>
                </b-field>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    setup () {


        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>
