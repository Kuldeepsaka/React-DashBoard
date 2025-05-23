import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateUser } from '../../store/slices/authSlice';
import { User, Mail, MapPin, Calendar, Phone, Save } from 'lucide-react';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      dispatch(updateUser({ 
        name: formData.name,
        // Other fields would typically be updated here too
      }));
      setSuccess(true);
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-4 mb-4 mb-lg-0">
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-4">
                <div className="user-avatar mx-auto" style={{ width: '100px', height: '100px' }}>
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    user?.name.charAt(0)
                  )}
                </div>
              </div>
              
              <h4 className="mb-1">{user?.name}</h4>
              <p className="text-muted mb-3">{user?.email}</p>
              
              <div className="d-grid gap-2">
                <button className="btn btn-primary">
                  Change Avatar
                </button>
              </div>
              
              <hr className="my-4" />
              
              <div className="profile-info">
                <div className="mb-3 d-flex align-items-center">
                  <div className="me-3 text-muted">
                    <Mail size={18} />
                  </div>
                  <div className="text-start">
                    <div className="text-sm text-muted">Email</div>
                    <div>{user?.email}</div>
                  </div>
                </div>
                
                <div className="mb-3 d-flex align-items-center">
                  <div className="me-3 text-muted">
                    <Phone size={18} />
                  </div>
                  <div className="text-start">
                    <div className="text-sm text-muted">Phone</div>
                    <div>{formData.phone || 'Not set'}</div>
                  </div>
                </div>
                
                <div className="mb-3 d-flex align-items-center">
                  <div className="me-3 text-muted">
                    <MapPin size={18} />
                  </div>
                  <div className="text-start">
                    <div className="text-sm text-muted">Location</div>
                    <div>{formData.location || 'Not set'}</div>
                  </div>
                </div>
                
                <div className="d-flex align-items-center">
                  <div className="me-3 text-muted">
                    <Calendar size={18} />
                  </div>
                  <div className="text-start">
                    <div className="text-sm text-muted">Member Since</div>
                    <div>March 15, 2023</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header bg-transparent">
              <h5 className="mb-0">Profile Information</h5>
            </div>
            <div className="card-body">
              {success && (
                <div className="alert alert-success" role="alert">
                  Profile updated successfully!
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Mail size={16} />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                    <div className="form-text">Email cannot be changed</div>
                  </div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Phone size={16} />
                      </span>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (123) 456-7890"
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <label htmlFor="location" className="form-label">Location</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <MapPin size={16} />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="bio" className="form-label">Bio</label>
                  <textarea
                    className="form-control"
                    id="bio"
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                  ></textarea>
                </div>
                
                <div className="d-flex justify-content-end">
                  <button 
                    type="submit" 
                    className={`btn btn-primary btn-icon ${isLoading ? 'btn-loading' : ''}`}
                    disabled={isLoading}
                  >
                    {!isLoading && <Save size={16} />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="card mt-4">
            <div className="card-header bg-transparent">
              <h5 className="mb-0">Account Security</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <h6 className="mb-3">Change Password</h6>
                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-primary">
                      Change Password
                    </button>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <h6 className="mb-3">Two-Factor Authentication</h6>
                  <p className="text-muted mb-3">Add an extra layer of security to your account</p>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="twoFactorAuth" />
                    <label className="form-check-label" htmlFor="twoFactorAuth">
                      Enable two-factor authentication
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;