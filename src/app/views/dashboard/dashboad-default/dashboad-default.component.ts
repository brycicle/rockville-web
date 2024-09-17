import {Component, OnInit, ViewChild} from '@angular/core';
import {EChartsOption} from 'echarts';
import {echartStyles} from '../../../shared/echart-styles';
import {AuthService} from '../../../shared/services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {LotService} from '../../../shared/services/lot.service';

@Component({
    selector: 'app-dashboad-default',
    templateUrl: './dashboad-default.component.html',
    styleUrls: ['./dashboad-default.component.css']
})
export class DashboadDefaultComponent implements OnInit {
    chartLineOption1: EChartsOption;
    chartLineOption2: EChartsOption;
    chartLineOption3: EChartsOption;
    salesChartBar: EChartsOption;
    salesChartPie: EChartsOption;
    @ViewChild('createPasswordModal') createPasswordModal;
    createNewPasswordForm: UntypedFormGroup;
    loading: boolean;
    loadingText: string;
    @ViewChild('errorModal') errorModal;

    errorMessage = '';
    modalTitle = 'Error';
    totalAvailable = 0;

    constructor(
        private fb: UntypedFormBuilder,
        private authService: AuthService,
        private modalService: NgbModal,
        private lotService: LotService,
    ) {
    }


    ngAfterViewInit(): void {
        if (this.authService.getIsResetPassword()) {
            this.modalService.open(this.createPasswordModal, {ariaLabelledBy: 'success', size: 'lg'});
        }
    }

    ngOnInit() {
        this.lotService.getDashboardDetails().subscribe(value => {
            this.totalAvailable = value.data.totalAvailable;
        });
        this.createNewPasswordForm = this.fb.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        });

        this.chartLineOption1 = {
            ...echartStyles.lineFullWidth, ...{
                xAxis: {
                    type: 'category',
                    data: ['1st Week', '2nd Week', '3rd Week', '4th Week']
                },
                series: [{
                    type: 'line',
                    data: [1, 3, 5, 6],
                    smooth: true,
                    markArea: {
                        label: {
                            show: true
                        }
                    },
                    areaStyle: {
                        color: 'rgba(0, 117, 195, .2)',
                        origin: 'start'
                    },
                    lineStyle: {
                        color: '#0075C3',
                    },
                    itemStyle: {
                        color: '#0D1216'
                    }
                }]
            }
        };
        this.chartLineOption2 = {
            ...echartStyles.lineFullWidth, ...{
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                series: [{
                    type: 'line',
                    data: [30, 10, 40, 10, 40, 20, 90],
                    smooth: true,
                    markArea: {
                        label: {
                            show: true
                        }
                    },
                    areaStyle: {
                        color: 'rgba(255, 193, 7, 0.2)',
                        origin: 'start'
                    },
                    lineStyle: {
                        color: '#FFC107'
                    },
                    itemStyle: {
                        color: '#FFC107'
                    }
                }]
            }
        };

        this.chartLineOption3 = {
            ...echartStyles.lineNoAxis, ...{
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                series: [{
                    data: [40, 80, 20, 90, 30, 80, 40, 90, 20, 80, 30, 45, 50, 110, 90, 145, 120, 135, 120, 140],
                    lineStyle: {
                        color: 'rgba(102, 51, 153, 0.86)',
                        width: 3,
                        ...echartStyles.lineShadow
                    },
                    label: {show: true, color: '#212121'},
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        borderColor: 'rgba(102, 51, 153, 1)'
                    }
                }]
            }
        };
        // this.chartLineOption3.xAxis = [{data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}];
        this.salesChartBar = {
            legend: {
                borderRadius: 0,
                orient: 'horizontal',
                // x: 'right',
                data: ['Online', 'Offline']
            },
            grid: {
                left: '8px',
                right: '8px',
                bottom: '0',
                containLabel: true
            },
            tooltip: {
                show: true,
                backgroundColor: 'rgba(0, 0, 0, .8)',
                textStyle: {
                    color: 'white'
                }
            },
            xAxis: [{
                type: 'category',
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
                axisTick: {
                    alignWithLabel: true
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: true
                }
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '${value}'
                },
                min: 0,
                max: 100000,
                interval: 25000,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: true,
                    interval: 'auto'
                }
            }

            ],

            series: [{
                name: 'Online',
                data: [35000, 69000, 22500, 60000, 50000, 50000, 30000, 80000, 70000, 60000, 20000, 30005],
                label: {show: false, color: '#0168c1'},
                type: 'bar',
                barGap: 0,
                color: '#bcbbdd',
                // smooth: true,

            },
                {
                    name: 'Offline',
                    data: [45000, 82000, 35000, 93000, 71000, 89000, 49000, 91000, 80200, 86000, 35000, 40050],
                    label: {show: false, color: '#639'},
                    type: 'bar',
                    color: '#7569b3',
                    // smooth: true
                }

            ]
        };

        this.salesChartPie = {
            color: ['#62549c', '#7566b5', '#7d6cbb', '#8877bd', '#9181bd', '#6957af'],
            tooltip: {
                show: true,
                backgroundColor: 'rgba(0, 0, 0, .8)',
                textStyle: {
                    color: 'white'
                }
            },

            xAxis: [{
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }

            ],
            yAxis: [{
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
            ],
            series: [{
                name: 'Sales by Country',
                type: 'pie',
                radius: '75%',
                center: ['50%', '50%'],
                data: [
                    {value: 535, name: 'USA'},
                    {value: 310, name: 'Brazil'},
                    {value: 234, name: 'France'},
                    {value: 155, name: 'Germany'},
                    {value: 130, name: 'UK'},
                    {value: 348, name: 'India'}
                ],
                itemStyle: {
                    // emphasis: {
                    //     shadowBlur: 10,
                    //     shadowOffsetX: 0,
                    //     shadowColor: 'rgba(0, 0, 0, 0.5)'
                    // }
                }
            }
            ]
        };
    }

    createNewPassword() {
        this.loading = true;
        this.loadingText = 'Saving Password...';

        if (this.createNewPasswordForm.value.password !== this.createNewPasswordForm.value.confirmPassword) {
            this.errorMessage = 'Password and Confirm Password does not match';
            this.loading = false;
            this.loadingText = 'Save';
            this.modalTitle = 'Error';
            this.createNewPasswordForm = this.fb.group({
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required]
            });
            this.modalService.open(this.errorModal, {ariaLabelledBy: 'modal-basic-title', size: 'sm'})
                .result.then((result) => {

            }, (reason) => {
            });
        } else {
            this.authService.createPassword(this.createNewPasswordForm.value)
                .subscribe(res => {
                        this.authService.setCredentials(res);
                        this.loading = false;
                        this.modalService.dismissAll();
                        this.modalTitle = 'Success';
                        this.errorMessage = 'Password saved successfully';
                        this.modalService.open(this.errorModal, {ariaLabelledBy: 'modal-basic-title', size: 'sm'})
                            .result.then((result) => {

                        }, (reason) => {
                        });
                    },
                    error => {
                        this.modalService.open(this.errorModal, {ariaLabelledBy: 'modal-basic-title', size: 'sm'})
                            .result.then((result) => {
                            console.log(result);
                        }, (reason) => {
                            console.log('Err!', reason);
                            this.errorMessage = 'Error Saving Password'
                        });
                        console.log(error);
                        this.loading = false;
                    }
                );
        }


    }

}
