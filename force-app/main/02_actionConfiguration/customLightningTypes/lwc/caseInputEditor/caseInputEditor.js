import { api, LightningElement } from 'lwc';

export default class CaseInputEditor extends LightningElement {
    /**
     * Indicate whether in readonly state
     * @type {boolean}
     */
    @api
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        this._readOnly = value;
    }
    _readOnly = false;
    _value;

    @api
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }

    subject;
    priority;
    description;

    priorityOptions = [
        { label: 'Low', value: 'Low' },
        { label: 'Medium', value: 'Medium' },
        { label: 'High', value: 'High' }
    ];

    connectedCallback() {
        if (this.value) {
            this.subject = this.value?.subject || '';
            this.priority = this.value?.priority || '';
            this.description = this.value?.description || '';
        }
    }

    handleInputChange(event) {
        event.stopPropagation();
        const { name, value } = event.target;
        this[name] = value;

        this.dispatchEvent(
            new CustomEvent('valuechange', {
                detail: {
                    value: {
                        subject: this.subject,
                        priority: this.priority,
                        description: this.description
                    }
                }
            })
        );
    }
}
