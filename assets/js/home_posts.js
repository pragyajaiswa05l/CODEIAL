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
                   deletePost($(' .delete-post-button',newPost));

                   // call the create comment class
                   new PostComments(data.data.post._id);

                   new Noty({
                       theme: 'relax',
                       text: "Post published!",
                       type: 'success',
                       layout: 'topRight',
                       timeout: 1500
                       
                   }).show();

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

    //method to delete a post from DOM(this function will be sending the AJAX request)
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'), // this is how we get the value of href of a tag
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }










    createPost();
    convertPostsToAjax();
}