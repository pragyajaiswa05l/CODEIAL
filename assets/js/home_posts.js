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
                   let newPost = newPostDom(data.data.post);
                   $('#posts-list-container>ul').prepend(newPost);
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                <p>
                    
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}">x</a>
                    </small>
                    
                    ${post.content}
                    <br>
                    <small>
                        ${ post.user.name}
                    </small>
                </p>
                <div class="post-comments">
                    
                        <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="Type Here to add a comment..." required>
            
                            <!-- the id of the post to which comment needs to be added -->
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="submit" value="Add Comment">
                        
                        </form>
                        
                        
                    
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                            
                        </ul>
                    </div>
            
                </div>
                
         </li>`)
    }

    createPost();
}