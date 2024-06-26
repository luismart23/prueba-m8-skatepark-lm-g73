// controllers/renderController.js


export const index = (req, res) => {
    return res.render('index')
}

export const login = (req, res) => {
    return res.render('login')
}

export const registro = (req, res) => {
    return res.render('registro')
}


export const participantes = (req, res) => {
    return res.render('participantes')
}


export const admin = (req, res) => {
    return res.render('admin')
}

