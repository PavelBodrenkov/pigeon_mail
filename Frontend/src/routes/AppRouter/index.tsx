import {Routes} from 'react-router-dom'

const AppRouter = () => {
    const loaded = true
    return loaded ? (
            <Routes>

            </Routes>
        ) :
        (<div>Загрузка...</div>)
}

export default AppRouter