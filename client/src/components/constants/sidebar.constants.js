import { ReactComponent as GovernanceIc } from '../../assets/svg/favorites_icon.svg';
import { ReactComponent as IntegrationIc } from '../../assets/svg/integration.svg'
import { ReactComponent as TransformationIc } from '../../assets/svg/transformation.svg';
// import { ReactComponent as TransintegrationIc } from '../../assets/images/favorites_icon.png';


export const SIDEBAR_MENU_OPTIONS = [
    { label: 'Generate Caption', path: '/qna', icon: <IntegrationIc />,adminRole:false },
    // { label: 'Upload', path: '/upload', icon: <TransformationIc />,adminRole:true },
    { label: 'Favorites', path: '/favorites', icon: <TransformationIc />,adminRole:false },
    // { label: 'Favorites', path: '/favorites', icon: <GovernanceIc /> },

    // {
    //     label: 'Governance',
    //     icon: <GovernanceIc />,
    //     children: [
    //         { label: 'Daily Snapshot', path: '/' },
    //         { label: 'Incident Overview', path: '/incident-overview' },
    //         { label: 'Metadata Store', path: '/metadata-store' },
    //     ]
    // },
    // { label: 'Isyt', path: '/isyt', icon: <IsytIc /> },
    // { label: 'Ontology Canvas', path: '/ontology-canvas', icon: <OntologyCanvasIc /> },
    // { label: 'Ontology', path: '/ontology', icon: <OntologyIc /> },
    
    
]