import "./styles/syntax.css"
import "./styles/styles.css"
import "./styles/funky-border-utilities.css"
import "./styles/responsive-video.css"

import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

const application = Application.start()
const context = require.context("./controllers", true, /\.js$/)
application.load(definitionsFromContext(context))
