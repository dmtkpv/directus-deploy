<!--
    Styles
-->

<style scoped>

    .deploy {
        padding: var(--page-padding-top) var(--page-padding) var(--page-padding-bottom);
    }
    .trigger {
        margin-top: var(--form-vertical-gap)
    }
    .loader {
        margin-top: 100px;
        display: flex;
        justify-content: center;
    }

</style>



<!--
    Template
-->

<template>
    <div class="deploy">


        <!-- header -->

        <v-header :breadcrumb="[]" icon="build" title="Deploy">
            <template slot="buttons">
                <v-header-button
                    :disabled="!editing"
                    :loading="saving"
                    :label="'Save'"
                    icon="check"
                    background-color="button-primary-background-color"
                    icon-color="button-primary-text-color"
                    @click="save"
                />
            </template>
        </v-header>


        <!-- loader -->

        <div class="loader" v-show="loading">
            <v-spinner />
        </div>


        <!-- content -->

        <div v-show="!loading">

            <v-form
                :fields="fields"
                :values="values"
                :collection="collection"
                @stage-value="stageValue"
            />

            <v-button
                class="trigger"
                @click="trigger()"
                :loading="triggering">
                Trigger deploy
            </v-button>

        </div>


    </div>
</template>



<!--
    Scripts
-->

<script>


    // helpers

    import schema from './collection'

    function removeId (fields) {
        fields = [...fields];
        fields.shift();
        return fields;
    }

    function is404 (error) {
        return error.info.error.response.status === 404;
    }


    // exports

    export default {

        data () {
            return {
                fields: removeId(schema.fields),
                collection: schema.collection,
                data: {},
                edits: {},
                loading: true,
                saving: false,
                triggering: false
            }
        },

        computed: {

            values () {
                return {
                    ...this.data,
                    ...this.edits
                };
            },

            editing () {
                return Object.keys(this.edits).length > 0;
            }

        },

        methods: {

            success () {
                this.$notify({
                    title: this.$t('settings_saved'),
                    color: 'green',
                    iconMain: 'check'
                });
            },

            error (error) {
                this.$events.emit('error', {
                    notify: error.message || this.$t('something_went_wrong_body'),
                    error
                });
            },

            trigger () {
                this.triggering = true

                // console.log(this.$api.api.request)
                this.$api.api.request("get", "/custom/deploy")
                    // .then(_ => {
                    //     this.$notify({
                    //         title: 'Deploy started',
                    //         color: 'green',
                    //         iconMain: 'check'
                    //     });
                    // })
                    // .catch(error => {
                    //     this.$events.emit('error', {notify: error.message || this.$t('something_went_wrong_body'), error});
                    // })
                    // .finally(() => {
                    //     this.triggering = false
                    // })
                // console.log('trigger')
            },

            save () {
                this.saving = true;
                this.$api.updateItem(schema.collection, 1, this.edits)
                    .then(response => {
                        this.edits = {};
                        this.data = response.data;
                        this.success();
                    })
                    .catch(error => {
                        this.error(error);
                    })
                    .finally(() => {
                        this.saving = false;
                    })
            },

            stageValue ({field, value}) {
                if (!this.data[field] && !value) return this.$delete(this.edits, field);
                if (this.data[field] === value) return this.$delete(this.edits, field);
                return this.$set(this.edits, field, value);
            }

        },

        created () {

            this.$api.getItem(schema.collection, 1)
                .then(response => {
                    return response;
                })
                .catch(error => {
                    if (is404(error)) return this.$api.createCollection(schema).then(_ => this.$api.createItem(schema.collection));
                    else throw error;
                })
                .then(response => {
                    this.data = response.data;
                })
                .catch(error => {
                    this.error(error);
                })
                .finally(() => {
                    this.loading = false;
                })
        }

    }

</script>

