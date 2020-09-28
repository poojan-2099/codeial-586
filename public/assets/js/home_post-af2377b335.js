$("document").ready(()=>{let e=e=>$(`<div id="post_${e._id}" class="card my-3">\n            <div class="card-body">\n                <div class="card-header d-flex justify-content-between ">\n                <div class="user_img d-flex">\n                    <img src="${e.user.avatar}" alt="${e.user.name}" class="img-circle">\n                    <div class=" d-flex flex-column mx-3">\n                        <h5 class="">${e.user.name.charAt(0).toUpperCase()+e.user.name.slice(1)}</h5>\n                    <sub class="text-muted">${moment(e.createdAt).fromNow().charAt(0).toUpperCase()+moment(e.createdAt).fromNow().slice(1)}</sub>\n                       \n                    </div>\n                </div>\n                   \n                  \n                    <a class="delete_post_button" href="/post/destroy/${e._id}">\n                        <h5 class="text-right"><i class="fas fa-trash"></i></h5>\n                    </a>\n                    \n                </div>\n               \n                ${null!=e.post_img?`<img src="${e.post_img}" class="card-img-top" alt="..."> `:""}   \n                <div class="d-flex">\n                <div>\n               <i class="fas fa-comments mr-4  mt-4 fa-lg"></i> \n            </div>\n               <div>\n                <h5 class="card-text mt-3" style="white-space: pre-line">${e.content}</h5>\n               </div>\n               \n            </div>\n            <br>  \n                <a href="/like/toggle/?id=${e._id}&type=Post" id="like-${e._id}" class="like-buttons"\n                data-toggle="false" data-likes="0"><i class="far fa-heart"></i> <span>0</span></a>\n                &nbsp&nbsp&nbsp\n\n                   \n            </div>\n            <div class="container-fluid">\n                <div class="row bootstrap snippets bootdeys">\n                    <div class="col" id="#card">\n                        <div class="comment-wrapper">\n                            <div class="card border-0">\n                                <div class="card-body">\n                                  \n                                    <form action="/comment/create_comment" method="POST">\n                                        <div class="input-group mb-3">\n                                            <input type="text" class="form-control" placeholder="comment .."\n                                                aria-label="comment .." name="comment_content"\n                                                aria-describedby="button-addon2" required>\n                                            <input type="hidden" name="post" value="${e._id}">\n    \n                                            <div class="input-group-append">\n                                                <button class="btn" type="submit" id="button-addon2"><svg\n                                                        xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"\n                                                        width="35" height="35" viewBox="0 0 172 172"\n                                                        style=" fill:#000000; margin-top:-7px">\n                                                        <g fill="none" fill-rule="nonzero" stroke="none"\n                                                            stroke-width="1" stroke-linecap="butt"\n                                                            stroke-linejoin="miter" stroke-miterlimit="10"\n                                                            stroke-dasharray="" stroke-dashoffset="0"\n                                                            font-family="none" font-weight="none" font-size="none"\n                                                            text-anchor="none" style="mix-blend-mode: normal">\n                                                            <path d="M0,172v-172h172v172z" fill="none"></path>\n                                                            <g fill="#302f2f">\n                                                                <path\n                                                                    d="M28.66667,17.2c-3.16643,0 -5.73333,2.5669 -5.73333,5.73333c0.00121,0.51864 0.07278,1.03472 0.21276,1.53411c0.0037,0.01121 0.00743,0.02241 0.0112,0.03359l5.50938,38.56563l-17.2,11.46667l120.4,11.46667l-120.4,11.46667l17.2,11.46667l-5.50938,38.57683c-0.14579,0.50609 -0.22115,1.02985 -0.22396,1.55651c0,3.16643 2.5669,5.73333 5.73333,5.73333c0.76223,-0.00413 1.51599,-0.16021 2.21719,-0.45911l0.0112,0.0112l0.24635,-0.12317l0.12318,-0.05599c0.03378,-0.01833 0.06738,-0.03699 0.10078,-0.05599l125.67422,-62.83151l0.0112,-0.02239c2.10882,-0.90013 3.47854,-2.97014 3.48255,-5.26302c-0.00144,-2.29965 -1.37681,-4.37592 -3.49375,-5.27422c0,-0.00373 0,-0.00746 0,-0.0112h-0.0112l-125.61823,-62.80911c-0.16728,-0.09443 -0.3392,-0.18038 -0.5151,-0.25755c-0.70546,-0.29652 -1.46314,-0.44882 -2.22839,-0.44792z">\n                                                                </path>\n                                                            </g>\n                                                        </g>\n                                                </svg></button>\n                                            </div>\n                                        </div>\n                                    </form>\n        \n                                    <hr>\n                                        <ul class="media-list" id="post-comment-${e._id}">\n                                      \n                                        </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>`),t=e=>{$(e).click(t=>{t.preventDefault(),confirm("Are you sure ! You want to delete this ?")&&$.ajax({method:"get",url:$(e).prop("href"),success:e=>{console.log(e),$("#post_"+e.data.post_id).remove(),callNotysuccess("Deleted Successfully !")},error:function(e){callNotyErr("Error In deleting ! Please try after some time"),console.log(e.responseText)}})})};!function(){for(let e of $(".delete_post_button"))t(e)}(),callNotysuccess=e=>{new Noty({theme:"relax",text:e,type:"success",layout:"topRight",timeout:3e3}).show()},callNotyErr=e=>{new Noty({theme:"relax",text:e,type:"error",layout:"topRight",timeout:3e3}).show()},(()=>{let n=$("#post_form");n.on("submit",s=>{s.preventDefault(),$.ajax({url:"/post/create",method:"POST",data:n.serialize(),success:function(n){let s=e(n.data.post);console.log(n.data.post),$("#notes_post").prepend(s),t($(" .delete_post_button",s)),callNotysuccess("Posted Successfully !"),new ToggleLike($("#like-"+n.data.post._id,s))},error:function(e){console.log(e.responseText),callNotyErr("Error In posting ! Please try after some time")}}),$("#post_form")[0].reset()})})()});