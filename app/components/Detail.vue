<template>
    <Page>
            <ActionBar title="Details" >
                <ActionItem @tap="$modal.close" text="Go back" ios.systemIcon="0" android.systemIcon="ic_menu_close_clear_cancel"></ActionItem>
            </ActionBar>

            <GridLayout columns = "*, *, 50" rows="auto, 60 ,200,50, *, 50">
                <Label class="drinkname" :text="$store.state.tappedDrink.name" textWrap="true" row="0" col="0" colSpan="2"></Label>
                <Image :src="pictureSrc" row="0" col="2" stretch="aspectFit" marginRight="0" ></Image>
                <image :src="$store.state.tappedDrink.imageHttp" row="1" col="0" rowSpan="2" stretch="aspectFill" @tap="setAsFavourite"></image>
                <Label class="rubrik" text="Ingredients" col="1" row="1" colSpan="2" ></Label>
                <ListView class="ingredientsList" row="2" col="1"  colSpan="2" for="items in $store.state.tappedDrink.ingredientslist" >
                    <v-template>
                        <GridLayout columns="*,auto" rows="*">
                            <Label :text = "items.measure" col="0" row="0"></Label>
                            <Label class="iName" :text="items.name" col="1" row="0" textWrap="true"></Label>
                        </GridLayout>
                    </v-template>
                </ListView>

                <Button v-if="favouriteModeOn" col="1" row="3" colSpan="2" text="Remove from favourites" textWrap="true" @tap="likeButtonPressed"  backgroundColor="white"></Button>
                <Button v-else col="1" row="3" colSpan="2" text="Add to favourites" textWrap="true" @tap="likeButtonPressed"  backgroundColor="white"></Button>
                <TextView row="4" col="0" colSpan="3" :text="$store.state.tappedDrink.instructions" textWrap="true"></TextView>
                <Button col="0" row="5" text="Go back" @tap="$modal.close" backgroundColor="#008b8b" color="white" colSpan="3"></Button>
            </GridLayout>
    </Page>
</template>

<script>

    //TODO: Fixa så att man kan trycka på stjärnan och flytta drinken till favoriter.
    //TODO: Fixa till vyn
    export default {
        created(){
            console.log('created runs in detailList', this.id)
            this.fetchInformation()

        },
        props: ['id', 'liked'],
        data(){
            return{
                drinkName:"Drinkname comes here",
                pictureSrc:"~/assets/images/star_unliked.png",
                ingredientList:[],
                favouriteModeOn: false

            }
        },
        methods:{
            setAsFavourite(){
                console.log("star tapped")
            },

            fetchInformation(){
                this.$store.dispatch('fetchInformationAboutDrink',  this.id)
                    .then( () => {
                        //Sets the star yellow in case the drink is one of users favourites
                        this.setStar()
                        this.setIngredientList()

                }).catch(err => {
                    console.log(err)
                })
            },
            setStar(){
                this.favouriteModeOn = this.$store.state.tappedDrink.isFavourite
                if(this.$store.state.tappedDrink.isFavourite){
                    this.pictureSrc = "~/assets/images/star_liked.png"
                }else{
                   this.pictureSrc = "~/assets/images/star_unliked.png"
                }
            },
            setIngredientList(){
                console.log('then method running ')
                for (let i = 0; i < this.$store.state.tappedDrink.ingredientslist.length; i++) {
                    var measure = this.$store.state.tappedDrink.ingredientslist[i].measure
                    var ingredient = this.$store.state.tappedDrink.ingredientslist[i].name
                    if(measure === "" && ingredient === ""){return}
                    else{
                        this.ingredientslist.unshift({measure: measure, name: ingredient})
                    }

                }
            },
            likeButtonPressed(){
                if(this.$store.state.tappedDrink.isFavourite){
                    this.$store.commit('removeDrinkFromFavourites')
                }else {
                    this.$store.commit('addDrinkToFavourites')
                }
                this.setStar()
            }
        }
    }
</script>

<style>
    .drinkname{
        text-align: center;
        font-size: 30;
        font-family: "Chalkboard SE";
    }
    .ingredientsList{
        margin-right: 20;
    }
    .iName{
       text-align: left;
    }
    .rubrik{
        font-size: 20;
        margin-top: 30;
    }
    text-view{
        font-size: 20;
        font-family: "Chalkboard SE";
    }

</style>