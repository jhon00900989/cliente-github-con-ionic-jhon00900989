import { IonSpinner } from "@ionic/react";  
import "./LoadingSpinner.css";

interface loadingSpinnerProps{
    isOpen : boolean;

}

const loadingSpinner : React.FC<loadingSpinnerProps> = ({ isOpen })=> {
    if (!isOpen) return null;

    return (
        <div className="loading-overlay">
            <IonSpinner name="circular" color="primary" className="loading-spinner"/>
        </div>

    );
}

export default loadingSpinner;