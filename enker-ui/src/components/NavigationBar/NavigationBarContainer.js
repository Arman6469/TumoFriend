import { connect } from 'react-redux'
import { withRouter } from "react-router";
import {logoutUser} from '../../redux/actions'

import NavigationBar from './NavigationBar';

const mapStateToProps = state => ({
    user: state.user.data,
    userError: state.user.error,
    withUser:state.network.withUser
})

const mapDispatchToProps = dispatch => {
 return{
   logoutUser: () => {
     dispatch(logoutUser())
   }
 }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationBar));
