import React from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Vote,
  Loader2,
  User,
  Building2,
  Hash,
  Camera,
  X,
  Check
} from 'lucide-react';
import { useRegister } from '../Context/RegisterContext';

const RegistrationPage: React.FC = () => {
  const {
    formData,
    handleChange,
    handleFileUpload,
    handleSubmit,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    errors,
    isLoading,
    currentStep,
    setCurrentStep,
    selfieImage,
    setSelfieImage,
    fileInputRef,
    passwordStrength,
    validateStep
  } = useRegister();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-12 px-4">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-3xl opacity-10 dark:opacity-5" />
      </div>

      <div className="relative max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl blur opacity-50" />
              <div className="relative bg-gradient-to-br from-blue-600 to-green-600 p-3 rounded-xl">
                <Vote className="w-8 h-8 text-white" />
              </div>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              VoteSecure
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-400">Join thousands using secure digital elections</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                    currentStep >= step ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg scale-110' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
                  }`}>
                    {currentStep > step ? <Check className="w-6 h-6" /> : step}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${currentStep >= step ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                    {step === 1 ? 'Personal' : step === 2 ? 'School' : 'Security'}
                  </span>
                </div>
                {step < 3 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                    currentStep > step ? 'bg-gradient-to-r from-blue-600 to-green-600' : 'bg-gray-200 dark:bg-gray-800'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl blur opacity-20" />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8">
            
            {errors.general && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-red-700 dark:text-red-400 font-medium">{errors.general}</span>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Account Type *</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleChange({ target: { name: 'userType', value: 'voter' } } as any)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.userType === 'voter'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-gray-900 dark:text-white">Voter</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Cast votes</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange({ target: { name: 'userType', value: 'admin' } } as any)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.userType === 'admin'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-gray-900 dark:text-white">Admin</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Manage elections</div>
                    </button>
                  </div>
                  {errors.userType && <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.userType}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.fullName ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
                      }`} />
                  </div>
                  {errors.fullName && <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@school.edu"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
                      }`} />
                  </div>
                  {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Member/Staff ID *</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" name="memberId" value={formData.memberId} onChange={handleChange} placeholder="2020/12345"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.memberId ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
                      }`} />
                  </div>
                  {errors.memberId && <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.memberId}</p>}
                </div>

                <button onClick={() => validateStep(1) && setCurrentStep(2)} className="group relative w-full mt-6">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition" />
                  <div className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                    Continue <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Organization Information</h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Organization *</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" name="organization" value={formData.organization} onChange={handleChange} placeholder="University of Lagos"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.organization ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
                      }`} />
                  </div>
                  {errors.organization && <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.organization}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Department</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Computer Science"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        errors.department ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
                      }`} />
                  </div>
                  {errors.department && <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.department}</p>}
                </div>

                {formData.userType === 'admin' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Position/Role *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Electoral Officer"
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
                          errors.position ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 dark:border-gray-700 focus:ring-blue-500'
                        }`} />
                    </div>
                    {errors.position && <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.position}</p>}
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setCurrentStep(1)} className="flex-1 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-bold hover:border-blue-500 transition">Back</button>
                  <button onClick={() => validateStep(2) && setCurrentStep(3)} className="group relative flex-1">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition" />
                    <div className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                      Continue <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Security</h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Create password"
                      className="w-full pl-12 pr-12 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 border-gray-200 dark:border-gray-700 focus:ring-blue-500" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Strength:</span>
                        <span className={`font-semibold ${passwordStrength.score < 3 ? 'text-orange-600' : 'text-green-600'}`}>{passwordStrength.label}</span>
                      </div>
                      <div className="flex gap-1">
                        {[0,1,2,3,4].map((i) => (
                          <div key={i} className={`h-2 flex-1 rounded-full ${i < passwordStrength.score ? passwordStrength.color : 'bg-gray-200 dark:bg-gray-700'}`} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password"
                      className="w-full pl-12 pr-12 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 border-gray-200 dark:border-gray-700 focus:ring-blue-500" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="mt-2 text-sm text-green-600 dark:text-green-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" />Passwords match</p>
                  )}
                  {errors.confirmPassword && <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.confirmPassword}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Selfie *</label>
                  {!selfieImage ? (
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="w-full text-left border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 cursor-pointer hover:border-blue-500 transition group" aria-label="Upload selfie" title="Upload selfie">
                      <Camera className="w-12 h-12 mx-auto mb-3 text-gray-400 group-hover:text-blue-500 transition" />
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Click to upload</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG up to 5MB</p>
                      <input ref={fileInputRef} id="selfie-input" type="file" accept="image/*" onChange={handleFileUpload} className="hidden" aria-label="Upload selfie" title="Upload selfie" />
                    </button>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-800">
                      <img src={selfieImage} alt="Selfie" className="w-full h-64 object-cover" />
                      <button onClick={() => setSelfieImage(null)} className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  {errors.selfie && <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.selfie}</p>}
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">I agree to the <a href="#" className="text-blue-600 hover:underline">Terms</a></span>
                </label>
                {errors.agreeToTerms && <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.agreeToTerms}</p>}

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setCurrentStep(2)} className="flex-1 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-bold">Back</button>
                  <button onClick={handleSubmit} disabled={isLoading} className="group relative flex-1">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl blur opacity-40 group-hover:opacity-70 transition" />
                    <div className="relative bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                      {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" />Registering...</> : <>Register<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;