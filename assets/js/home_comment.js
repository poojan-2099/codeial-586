{

    $('document').ready(() => {

        //method of Creating a Comment with ajax request

        let createComment = (comment_form) => {

            comment_form.submit((e) => {
                e.preventDefault();

                $.ajax({
                    url: '/comment/create_comment',
                    method: 'POST',
                    data: comment_form.serialize(),

                    success: function (data) {

                        let newComment = newCommentDom(data.data.comment);
                        $(`#post-comment-${data.data.comment.post}`).prepend(newComment);

                        deleteComment($(' .delete_comment_button', newComment));
                        new ToggleLike($(`#like-${data.data.comment._id}`, newComment));

                        callNotysuccess('Commented Successfully !');
                    },
                    error: function (error) {
                        console.log(error.responseText);
                        callNotyErr('Error In Commenting ! Please try after some time');

                    }
                });
                comment_form[0].reset();
            });
        }

        //html of ajax comment

        let newCommentDom = (comment) => {
            return `<li class="media"  id="post-comment-${comment._id}">
       <a href="#" class="pull-left">
           <img src="${comment.user.avatar}" alt="" class="img-circle">
       </a>
       <div class="media-body mx-2">
           <strong class="text-success"> ${comment.user.name}</strong>
           <br>
           <sup class="text-muted pull-right ">
               <small class="text-muted" id="time_comment">${moment(comment.createdAt).fromNow().charAt(0).toUpperCase() + moment(comment.createdAt).fromNow().slice(1)}</small>
           </sup>
           <p>
            ${comment.content}
           </p>
           <p>
           <a href="/like/toggle/?id=${comment._id}&type=Comment" id="like-${comment._id}" class="like-buttons"
           data-likes="0" data-toggle="false"><i class="far fa-heart"></i>
           <span>0</span> </a> &nbsp;&nbsp;&nbsp;
           </p>
       </div>
   
               <a class="delete_comment_button" href="/comment/destroy/${comment._id}">
                   <h5 class="text-right"><i class="fas fa-trash"></i></h5>
               </a>
      
   </li>`
        }
        //request of deleting comment with ajax request !!

        let deleteComment = (deleteLink) => {

            $(deleteLink).click((event) => {
                event.preventDefault();
                if(confirm("Are you sure ! You want to delete this ?")){

                $.ajax({
                    method: 'get',
                    url: $(deleteLink).prop('href'),
                    success: (data) => {
                        $(`#post-comment-${data.data.comment_id}`).remove();
                        callNotysuccess('Deleted Successfully !');

                    },
                    error: function (error) {
                        callNotyErr('Error In deleting ! Please try after some time');
                        console.log(error.responseText);
                    }
                });
            }
            });

        }

        //all comments delted dnamicaly

        let apply_dynamic_delete_to_existing_comment = function () {
            for (let link of $('.delete_comment_button')) {
                deleteComment(link)
            }
        }
        //all comments are created dynamicaly

        for (let comment_form of $('.comment_form')) {
            createComment($(comment_form));
        }

        apply_dynamic_delete_to_existing_comment();


        callNotysuccess=(text)=>{
            new Noty({
            theme:'relax',
            text:text,
            type:'success',
            layout:'topRight',
            timeout:3000
        }).show();
    }
    callNotyErr=(text)=>{
            new Noty({
            theme:'relax',
            text:text,
            type:'error',
            layout:'topRight',
            timeout:3000
        }).show();
    }

        createComment();

    });
}


