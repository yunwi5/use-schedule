import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUpload } from '@fortawesome/pro-duotone-svg-icons';
import ExportModal from '../../../import-export/ExportModal';
import ImportModal from '../../../import-export/ImportModal';

interface Props {
    beginningPeriod: Date;
    onInvalidate: () => void;
}

const CalendarImportExport: React.FC<Props> = (props) => {
    const [showExportModal, setShowExportModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);

    const toggleExportModal = () => setShowExportModal((ps) => !ps);
    const toggleImportModal = () => setShowImportModal((ps) => !ps);

    return (
        <>
            <section className="pt-1 pl-2 flex flex-col text-slate-500">
                <div className="pb-1 mb-1 flex justify-between items-center text-lg border-b-2 border-slate-300">
                    <h5 className="text-lg text-slate-500">Externals</h5>
                </div>
                <div>
                    <button
                        className="parent-hider font-semibold flex items-center transition-all py-1 hover:py-2 rounded-md hover:px-3 hover:bg-blue-500/70 hover:text-sky-50"
                        onClick={toggleImportModal}
                    >
                        <FontAwesomeIcon
                            icon={faUpload}
                            className={`icon-medium mr-1 child-hider`}
                        />
                        Import
                    </button>
                </div>
                <div>
                    <button
                        className="parent-hider font-semibold flex items-center transition-all py-1 hover:py-2 rounded-md hover:px-3 hover:bg-pink-500/70 hover:text-pink-50"
                        onClick={toggleExportModal}
                    >
                        <FontAwesomeIcon
                            icon={faDownload}
                            className={'icon-medium mr-1 child-hider'}
                        />
                        Export
                    </button>
                </div>
            </section>
            {showExportModal && <ExportModal onClose={toggleExportModal} {...props} />}
            {showImportModal && <ImportModal onClose={toggleImportModal} {...props} />}
        </>
    );
};

export default CalendarImportExport;
