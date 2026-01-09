import { UploadedCV } from '../types';
import { formatFileSize } from '../utils/fileValidation';
import { Link } from 'react-router-dom';

interface FilePreviewProps {
  file: UploadedCV;
  onRemove: () => void;
}

export default function FilePreview({ file, onRemove }: FilePreviewProps) {
  const getFileIcon = (fileName: string) => {
    if (fileName.toLowerCase().endsWith('.pdf')) return 'ri-file-pdf-line';
    return 'ri-file-word-line';
  };

  const getFileType = (fileName: string) => {
    if (fileName.toLowerCase().endsWith('.pdf')) return 'PDF Document';
    return 'Word Document';
  };

  const fileIcon = file.type === 'pdf' ? 'ri-file-pdf-line' : 'ri-file-word-line';
  const fileIconColor = file.type === 'pdf' ? 'from-red-500 to-red-600' : 'from-blue-500 to-blue-600';
  const fileIconBg = file.type === 'pdf' ? 'bg-red-50' : 'bg-blue-50';

  return (
    <div className="space-y-4 md:space-y-6">
      {/* File Card */}
      <div className="bg-white rounded-2xl border-2 border-emerald-200 shadow-soft-lg p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* File Icon */}
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl shadow-lg">
              <i className={`text-3xl md:text-4xl text-white ${getFileIcon(file.name)}`}></i>
            </div>
          </div>

          {/* File Info */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-1 truncate px-2 sm:px-0">
              {file.name}
            </h3>
            <p className="text-xs md:text-sm text-slate-600">
              {formatFileSize(file.size)} • {getFileType(file.name)}
            </p>
          </div>

          {/* Remove Button */}
          <button
            onClick={onRemove}
            className="flex-shrink-0 w-full sm:w-auto px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <i className="ri-delete-bin-line mr-2"></i>
            Remove
          </button>
        </div>
      </div>

      {/* Success Message */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 shadow-soft p-4 md:p-6">
        <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
              <i className="ri-checkbox-circle-line text-xl md:text-2xl text-white"></i>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-base md:text-lg font-semibold text-slate-900 mb-1">
              CV Uploaded Successfully!
            </h4>
            <p className="text-xs sm:text-sm md:text-base text-slate-600">
              Your CV has been securely uploaded. You can now proceed to research companies or manage your applications.
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="space-y-3">
          <h5 className="text-sm md:text-base font-semibold text-slate-900 flex items-center gap-2">
            <i className="ri-compass-line text-base md:text-lg text-teal-600"></i>
            Next Steps
          </h5>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/company-research"
              className="group flex-1 flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:shadow-teal-500/50 transition-all hover:scale-105 cursor-pointer whitespace-nowrap text-sm md:text-base"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-xl"></div>
              <span className="relative z-10">Research Companies</span>
              <i className="ri-arrow-right-line relative z-10 group-hover:translate-x-1 transition-transform"></i>
            </Link>
            <button
              onClick={onRemove}
              className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all cursor-pointer whitespace-nowrap text-sm md:text-base"
            >
              Upload Different CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
