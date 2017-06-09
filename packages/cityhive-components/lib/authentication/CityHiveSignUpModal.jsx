import React, {Component} from 'react';
import {Modal, ModalComponent} from 'meteor/patrickml:react-modal';
import {Messages} from 'meteor/nova:core';
import CityHiveSignUp from './CityHiveSignUp';

class CityHiveSignUpModal extends ModalComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="city-hive-sign-up-modal">
                {
                    this.props.ready ?
                        <Modal isOpen={ this.props.isOpen } close={ this.props.closeModal }>
                            <CityHiveSignUp/>
                        </Modal>
                        : <p>Loading</p>
                }
            </div>
        )
    }

}


CityHiveSignUpModal.displayName = "CityHiveSignUpModal";

module.exports = CityHiveSignUpModal;

export default CityHiveSignUpModal