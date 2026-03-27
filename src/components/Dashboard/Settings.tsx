import React from 'react';
import { Pencil, ChevronDown } from 'lucide-react';
import './Settings.css';

const CustomCalendarIcon = ({ size = 20, className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 1024 1024" className={className}>
        <path fill="currentColor" d="m960 95.888l-256.224.001V32.113c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76h-256v-63.76c0-17.68-14.32-32-32-32s-32 14.32-32 32v63.76H64c-35.344 0-64 28.656-64 64v800c0 35.343 28.656 64 64 64h896c35.344 0 64-28.657 64-64v-800c0-35.329-28.656-63.985-64-63.985m0 863.985H64v-800h255.776v32.24c0 17.679 14.32 32 32 32s32-14.321 32-32v-32.224h256v32.24c0 17.68 14.32 32 32 32s32-14.32 32-32v-32.24H960zM736 511.888h64c17.664 0 32-14.336 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32m0 255.984h64c17.664 0 32-14.32 32-32v-64c0-17.664-14.336-32-32-32h-64c-17.664 0-32 14.336-32 32v64c0 17.696 14.336 32 32 32m-192-128h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32m0-255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32m-256 0h-64c-17.664 0-32 14.336-32 32v64c0 17.664 14.336 32 32 32h64c17.664 0 32-14.336 32-32v-64c0-17.68-14.336-32-32-32m0 255.984h-64c-17.664 0-32 14.336-32 32v64c0 17.68 14.336 32 32 32h64c17.664 0 32-14.32 32-32v-64c0-17.648-14.336-32-32-32" />
    </svg>
);

const Settings: React.FC = () => {
    return (
        <div className="settings-container">
            <h2 className="settings-title">Profile</h2>

            <div className="profile-header">
                <div className="big-avatar">A</div>
                <button className="edit-profile-btn">
                    <Pencil size={16} fill="white" />
                    Edit Profile
                </button>
            </div>

            <form className="settings-form">
                {/* Name Row */}
                <div className="form-row">
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-input" defaultValue="Lyden" />
                    </div>
                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-input" defaultValue="Tshukudu" />
                    </div>
                </div>

                {/* Date of Birth */}
                <div className="form-group">
                    <label>Date of birth</label>
                    <div className="form-input-wrapper">
                        <CustomCalendarIcon className="input-icon" size={20} />
                        <input type="text" className="form-input has-icon" defaultValue="20 - 02 - 200" />
                    </div>
                </div>

                {/* Gender */}
                <div className="form-group">
                    <label>Gender</label>
                    <div className="select-wrapper">
                        <select className="form-select" defaultValue="Male">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <ChevronDown className="select-arrow" size={20} />
                    </div>
                </div>

                {/* Phone Number */}
                <div className="form-group">
                    <label>Phone number (write in full)</label>
                    <input type="text" className="form-input" defaultValue="+267 74425925" />
                </div>

                {/* Identification Row */}
                <div className="form-row">
                    <div className="form-group">
                        <label>Type of identification</label>
                        <div className="select-wrapper">
                            <select className="form-select" defaultValue="ID">
                                <option value="ID">Omang</option>
                                <option value="Passport">Passport</option>
                            </select>
                            <ChevronDown className="select-arrow" size={20} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>ID Number / Passport</label>
                        <input type="text" className="form-input" placeholder="" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Settings;
