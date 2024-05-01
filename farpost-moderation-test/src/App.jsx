import ModerationList from "./components/moderation-list.jsx";
import ModerationHotkeys from "./components/moderation-hotkeys.jsx";
import {useEffect, useState} from "react";
import {appLaunched, moderationResponse, postData} from "../state/postData.js";
function disableFunctionKeys(e) {
    let functionKeys = [112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 123, 32];
    if (functionKeys.indexOf(e.keyCode) > -1 || functionKeys.indexOf(e.which) > -1) {
        e.preventDefault();
    }
}
document.onkeydown = disableFunctionKeys;
async function getPosts() {
    let response = []
    await fetch("http://localhost:8081/api/posts", {
        method: 'GET',
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(res => res.json())
        .then(data => {
            response = data;
        })
        .catch(err => console.log(err))
    return response
}
async function sendModerations() {
    let response = [];
    await fetch("http://localhost:8081/api/posts", {
        method: 'POST',
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(moderationResponse.value)
    }).then(async(res) => {
        response = await getPosts()
    }).catch(err => console.log(err));
    return response
}
function App() {
    const [launchModeration, setLaunchModeration] = useState(false);
    const [ dataLoaded, setDataLoaded] = useState(false);
    useEffect(() => {
        window.addEventListener("keyup", async function(event) {
            switch (event.key) {
                case "Enter": {
                    if (!appLaunched.value) {
                        setDataLoaded(dataLoaded => false);
                        setLaunchModeration(launchModeration => launchModeration = false);
                        postData.value = await getPosts();
                        if (postData.value[0] !== undefined) {
                            setLaunchModeration(launchModeration => launchModeration = true);
                            setDataLoaded(dataLoaded => true);
                            appLaunched.value = true
                        } else {

                        }
                    } else {console.log('app already launched')}
                    break;
                }
                case "F7": {
                    setLaunchModeration(launchModeration => launchModeration = false);
                    setDataLoaded(dataLoaded => false);
                    if (moderationResponse.value.length === postData.value.length) {
                        postData.value = await sendModerations();
                        moderationResponse.value = [];
                        if (postData.value[0] !== undefined) {
                            setLaunchModeration(launchModeration => launchModeration = true);
                            setDataLoaded(dataLoaded => true);
                        } else {
                            appLaunched.value = false
                        }
                    } else {
                        alert(appLaunched.value?'Текущий список обработан не полностью': 'Приложение не запущено')
                    }
                    break
                }
            }
        }, true);
        return () => window.removeEventListener("keyup", function(event) {})
    },[])

  return (
    <> {(launchModeration === true)
        ? [
            (dataLoaded === true)?[<ModerationList key={1}/>]:"Nothing here. Try again later",
            <ModerationHotkeys key={2}/>
                ]
        : "Press Enter to start"
    }
    </>
  )
}

export default App
