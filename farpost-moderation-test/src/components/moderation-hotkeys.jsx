import HotkeyString from "./hotkey-string.jsx";

function ModerationHotkeys() {
    const hotkeys = [
        {title: 'Одобрить', color: '#88BD35', hotkey: 'Пробел'},
        {title: 'Отклонить', color: '#F7882E', hotkey: 'Del'},
        {title: 'Эскалация', color: '#1764CC', hotkey: 'Shift+Enter'},
        {title: 'Сохранить', color: 'rgba(0,0,0,0)', hotkey: 'F7'},
    ]
    return (
            <div className="moderationHotkeys">
                {
                    hotkeys.map(function(hotkey) {
                        return (
                            <div className="hotkeyString" key={hotkey.title}>
                            <HotkeyString

                                title={hotkey.title}
                                color={hotkey.color}
                                hotkey={hotkey.hotkey}/></div>
                        )
                })}
            </div>
    )
}
export default ModerationHotkeys;