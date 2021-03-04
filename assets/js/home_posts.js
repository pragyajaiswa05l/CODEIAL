//within scope
{
    //a function which sends the data to the controller action

    //method to submit the form data for new post using AJAX
    let createPost = function(){

        // to get the post from home.ejs which we are submitting
        let newPostForm = $('#new-post-form');

        //we don't the form to be submitted naturallly so we are doing preventDefault.e stand for event
        newPostForm.submit(function(e){
            e.preventDefault();


            //to manually submit the form using AJAX
            $.ajax({
                type: 'post',
                url: '/posts/create',

                //we need to  send in data that we are creating post for
                data: newPostForm.serialize(),//this convert the form data into Json ie key and value
                success : function(data){
                    console.log(data);
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();
}