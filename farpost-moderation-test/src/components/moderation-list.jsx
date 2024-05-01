import {postData, moderationResponse, appLaunched} from "../../state/postData.js";
import PostCard from "./post-card.jsx";
import {useRef, useEffect, useState} from "react";

function promptCall(method) {
    return prompt(`Введите причину для ${(method==='DELETE')?'отказа (обязательно)':'передачи вышестоящему модератору (не обязательно)'}`, '');
}
function upsert(array, element) {
    const i = array.findIndex(e => e.id === element.id);
    if (i > -1) array[i] = element;
    else array.push(element);
}

function ModerationList() {
    const [currentDiv, setCurrentDiv] = useState(0)
    const selectedDiv = useRef(null)
    const smthElse = useRef(null)
    useEffect(() => {
        selectedDiv.current.focus()
    },[currentDiv])
    const clickSelect = (index) => {
        setCurrentDiv(index)
    }
    const createResponseInstance = (event, index) => {
        let responseInstance = {
            id: postData.value[index].id,
            post: postData.value[index],
            responseType: '',
            comment: ''
        }
        switch (event.code) {
            case 'Space': {
                responseInstance.responseType = 'approved'
                /*if (!moderationResponse.value.some(e => e.id === postData.value[index].id)) {
                    moderationResponse.value.push(responseInstance);
                }*/
                upsert(moderationResponse.value, responseInstance)
                setCurrentDiv((index < (postData.value.length - 1))? (index+1) : index);
                break;
            }
            case 'Delete': {
                responseInstance.responseType = 'deleted'
                let getComment = promptCall('DELETE');
                if (getComment === '') {
                    alert('Пустой коммент, попробуй еще раз')
                } else {
                    responseInstance.comment = getComment;
                    upsert(moderationResponse.value, responseInstance)
                    setCurrentDiv((index < (postData.value.length - 1))? (index+1) : index);
                }
                break;
            }
            case ('Shift'&&'Enter'): {
                responseInstance.responseType = 'escalated'
                responseInstance.comment = promptCall('ESCALATE');
                upsert(moderationResponse.value, responseInstance)
                setCurrentDiv((index < (postData.value.length - 1))? (index+1) : index);
                break;
            }
        }
    }

    return (<div className="moderationList">
        {
            postData.value.map(function (post, index) {
                return (
                    <div onKeyUp={(event) => createResponseInstance(event, index)}
                         onClick={() => clickSelect(index)}
                         ref={index === currentDiv ? selectedDiv : smthElse}
                         tabIndex={-1 * (index + 1)}
                         id={post.id}
                         key={post.id}
                         className={"postCard " + (index === currentDiv ? "active" : "")}>
                        <PostCard postInfo={post}
                        />
                    </div>
                )
            })
        }
    </div>)
}


export default ModerationList