export const COURSE_URL = 'https://echiphub.in/all-courses/'
export const GITHUB_BASE_URL = 'https://github.com/echiphub'

// ── Course Interfaces ──
export type CourseCategory = 'rtl' | 'verification' | 'physical-design' | 'analog' | 'riscv' | 'fpga' | 'eda'
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced'
export type CourseStatus = 'live' | 'upcoming' | 'completed'
export type ContentFormat = 'course' | 'workshop' | 'lab'

export interface CourseModule {
  id: string
  week: string
  title: string
  lessons: string[]
  duration: string
}

export interface CourseIncludes {
  modulesCount: number
  labsCount: number
  projectsCount: number
  hasGithubRepo: boolean
}

export interface Course {
  id: number
  slug: string
  status: CourseStatus
  centre: string
  kind: string
  category: CourseCategory
  level: CourseLevel
  format: ContentFormat
  duration: string
  technologies: string[]
  img: string
  title: string
  desc: string
  longDesc?: string
  learnPoints: string[]
  modules: CourseModule[]
  includes: CourseIncludes
  enrolled?: boolean
  progress?: number
  currentModule?: string
  labId?: string
  projectId?: string
  githubRepo?: string
}

export const COURSES: Course[] = [
  {
    id: 1,
    slug: 'rtl-design-verification',
    status: 'completed',
    centre: 'Noida Center',
    kind: 'rtl',
    category: 'rtl',
    level: 'Intermediate',
    format: 'course',
    duration: '6 Weeks',
    technologies: ['Verilog', 'SystemVerilog', 'Icarus Verilog', 'GTKWave'],
    img: new URL('../../Website Image/verilog.png', import.meta.url).href,
    title: 'RTL Design & Verification using Verilog & SystemVerilog',
    desc: 'Master digital logic design, testbenches, assertions, coverage, and RTL simulation workflows.',
    longDesc: 'A comprehensive hands-on curriculum taking you through digital system architecture, finite state machines, synthesizable RTL coding styles in Verilog/SystemVerilog, and modern functional verification methodologies.',
    includes: {
      modulesCount: 6,
      labsCount: 2,
      projectsCount: 2,
      hasGithubRepo: true
    },
    learnPoints: [
      'Synthesizable Verilog & SystemVerilog RTL coding styles',
      'Self-checking testbench architecture with tasks & functions',
      'SystemVerilog assertions (SVA) & functional coverage',
      'Clock domain crossing (CDC) and timing-safe design',
      'Logic simulation with Icarus Verilog and GTKWave debug'
    ],
    modules: [
      {
        id: 'w1',
        week: 'Week 1',
        title: 'Introduction & RTL Fundamentals',
        duration: '10 hours',
        lessons: ['Digital logic refresher & timing basics', 'Combinational vs sequential RTL modeling', 'Verilog 2001/2005 constructs & simulator semantics']
      },
      {
        id: 'w2',
        week: 'Week 2',
        title: 'SystemVerilog for Design',
        duration: '12 hours',
        lessons: ['always_comb, always_ff, always_latch rules', 'Packages, interfaces and typed data structures', 'Parameterized hardware pipelines & FSM design']
      },
      {
        id: 'w3',
        week: 'Week 3',
        title: 'Testbench Development & Verification',
        duration: '14 hours',
        lessons: ['Layered testbench architecture', 'Randomization and constrained stimulus generation', 'Scoreboards, monitors, and automated checkers']
      },
      {
        id: 'w4',
        week: 'Week 4',
        title: 'Functional Coverage & SVA',
        duration: '12 hours',
        lessons: ['SystemVerilog Assertions (Immediate vs Concurrent SVA)', 'Covergroups, coverpoints and cross coverage', 'Coverage closure strategies and metrics']
      },
      {
        id: 'w5',
        week: 'Week 5',
        title: 'Synthesis & Static Checks',
        duration: '10 hours',
        lessons: ['Yosys logic synthesis and netlist inspection', 'Linting with Verilator and formal checking', 'Clock gating and power optimization fundamentals']
      },
      {
        id: 'w6',
        week: 'Week 6',
        title: 'Capstone: FIFO & Memory Controller',
        duration: '16 hours',
        lessons: ['Asynchronous FIFO design with Gray code pointers', 'Complete SVA test suite and coverage sign-off', 'Lab demonstration & packaging']
      }
    ],
    enrolled: true,
    progress: 80,
    currentModule: 'Module 6 — Functional Verification',
    labId: 'rtl-sim-lab',
    projectId: 'riscv-cpu',
    githubRepo: 'echiphub/rtl-verification-suite'
  },
  {
    id: 2,
    slug: 'physical-design-openlane',
    status: 'live',
    centre: 'Ropar Center',
    kind: 'openlane',
    category: 'physical-design',
    level: 'Advanced',
    format: 'course',
    duration: '8 Weeks',
    technologies: ['OpenLane', 'Yosys', 'Magic', 'KLayout', 'OpenROAD'],
    img: new URL('../../Website Image/Neon OpenLane EDA Flow Chip Infographic.png', import.meta.url).href,
    title: 'Physical Design and OpenLane EDA Flow',
    desc: 'Hands-on ASIC physical design from RTL synthesis to DRC/LVS clean GDSII layout.',
    longDesc: 'Learn the complete automated RTL-to-GDSII ASIC physical design flow using the open-source OpenLane toolchain on the SkyWater 130nm / FreePDK45 PDKs.',
    includes: {
      modulesCount: 8,
      labsCount: 3,
      projectsCount: 2,
      hasGithubRepo: true
    },
    learnPoints: [
      'Automated RTL synthesis with Yosys and ABC',
      'Floorplanning, power mesh grid (PDN) design & pin placement',
      'Standard cell placement, legalization and congestion analysis',
      'Clock Tree Synthesis (CTS) for skew & jitter minimization',
      'Global/detailed routing, DRC, LVS, and GDSII tape-out sign-off'
    ],
    modules: [
      {
        id: 'pd-w1',
        week: 'Week 1-2',
        title: 'ASIC Overview & Synthesis',
        duration: '12 hours',
        lessons: ['Standard cell libraries (Liberty files & LEF)', 'Logic synthesis constraints (SDC)', 'Area vs timing trade-offs with Yosys']
      },
      {
        id: 'pd-w2',
        week: 'Week 3-4',
        title: 'Floorplanning & Power Distribution',
        duration: '14 hours',
        lessons: ['Core area, die boundary & aspect ratio calculations', 'I/O pad and pin placement strategies', 'Power distribution network (PDN) design & IR drop analysis']
      },
      {
        id: 'pd-w3',
        week: 'Week 5-6',
        title: 'Placement & Clock Tree Synthesis',
        duration: '16 hours',
        lessons: ['Global vs detailed placement techniques', 'Clock tree synthesis (TritonCTS) & skew balancing', 'Hold-time buffer insertion and setup optimization']
      },
      {
        id: 'pd-w4',
        week: 'Week 7-8',
        title: 'Routing & Final Tape-out Sign-off',
        duration: '16 hours',
        lessons: ['FastRoute global routing & detailed TritonRoute', 'Antenna rule checks and diode insertion', 'Design Rule Check (DRC), LVS with Magic & Netgen', 'Final GDSII streaming and KLayout layout review']
      }
    ],
    enrolled: true,
    progress: 45,
    currentModule: 'Floorplanning & Power Distribution',
    labId: 'openlane-pd-lab',
    projectId: 'openlane-gdsii',
    githubRepo: 'echiphub/openlane-asic-flow'
  },
  {
    id: 3,
    slug: 'riscv-microarchitecture',
    status: 'upcoming',
    centre: 'Imphal Center',
    kind: 'riscv',
    category: 'riscv',
    level: 'Intermediate',
    format: 'course',
    duration: '8 Weeks',
    technologies: ['RISC-V', 'RV32I', 'Verilog', 'Spike Simulator', 'FPGA'],
    img: new URL('../../Website Image/Risc-v.png', import.meta.url).href,
    title: 'RISC-V Microarchitecture and Processor Design',
    desc: 'Learn RISC-V ISA, 5-stage pipelined CPU core design, hazard units, and FPGA prototyping.',
    longDesc: 'Build a compliant 32-bit RISC-V processor core from scratch. Implement instruction decoding, ALU execution, memory interfacing, forwarding units, and run real C programs.',
    includes: {
      modulesCount: 8,
      labsCount: 2,
      projectsCount: 2,
      hasGithubRepo: true
    },
    learnPoints: [
      'RISC-V RV32I instruction set architecture (ISA)',
      '5-stage pipelined microarchitecture (IF, ID, EX, MEM, WB)',
      'Data hazard detection, pipeline stalls & forwarding units',
      'Control hazard handling and branch prediction algorithms',
      'Memory-mapped I/O (MMIO), UART peripheral & FPGA bring-up'
    ],
    modules: [
      {
        id: 'rv-w1',
        week: 'Week 1-2',
        title: 'RISC-V ISA & Single-Cycle Core',
        duration: '12 hours',
        lessons: ['RISC-V registers, instruction formats (R, I, S, B, U, J)', 'Arithmetic logic unit (ALU) and program counter (PC)', 'Single-cycle control path and data path construction']
      },
      {
        id: 'rv-w2',
        week: 'Week 3-4',
        title: 'Pipelining & Hazard Management',
        duration: '14 hours',
        lessons: ['5-stage pipeline registers and stage transitions', 'RAW hazards and register forwarding unit design', 'Load-use hazard detection and pipeline stalls']
      },
      {
        id: 'rv-w3',
        week: 'Week 5-6',
        title: 'Memory Interface & Peripherals',
        duration: '12 hours',
        lessons: ['Harvard vs von Neumann caching basics', 'Wishbone / AXI-Lite bus protocol bridge', 'UART communication and timer peripheral integration']
      },
      {
        id: 'rv-w4',
        week: 'Week 7-8',
        title: 'Software Execution & FPGA Prototyping',
        duration: '16 hours',
        lessons: ['Cross-compiling C code with GCC RISC-V toolchain', 'Bootloader firmware and bare-metal program execution', 'Synthesis and bitstream deployment to FPGA board']
      }
    ],
    enrolled: false,
    progress: 0,
    labId: 'riscv-bringup-lab',
    projectId: 'riscv-cpu',
    githubRepo: 'echiphub/riscv-rv32i-core'
  },
  {
    id: 4,
    slug: 'analog-mixed-signal-ic',
    status: 'live',
    centre: 'Patna Center',
    kind: 'analog',
    category: 'analog',
    level: 'Intermediate',
    format: 'course',
    duration: '6 Weeks',
    technologies: ['Ngspice', 'Xschem', 'Magic', 'Qflow', 'SPICE'],
    img: new URL('../../Website Image/Neon Mixed-Signal IC Design Infographic.png', import.meta.url).href,
    title: 'Analog and Mixed-Signal IC Design with Qflow',
    desc: 'Explore CMOS analog modeling, SPICE simulation, op-amp design, and physical verification.',
    longDesc: 'From MOSFET small-signal models to two-stage operational amplifier layout, learn full-custom analog integrated circuit design using open-source EDA tools.',
    includes: {
      modulesCount: 6,
      labsCount: 2,
      projectsCount: 2,
      hasGithubRepo: true
    },
    learnPoints: [
      'MOSFET square-law equations, small-signal models & parameters',
      'Single-stage amplifiers: CS, CG, CD, and cascode topologies',
      'Two-stage Miller-compensated operational transconductance amplifiers',
      'Schematic capture with Xschem and SPICE simulation with Ngspice',
      'Full-custom analog layout, parasitic extraction (PEX) & DRC/LVS'
    ],
    modules: [
      {
        id: 'ams-w1',
        week: 'Week 1-2',
        title: 'CMOS Fundamentals & Modeling',
        duration: '10 hours',
        lessons: ['MOSFET I-V curves, subthreshold operation & gm/Id methodology', 'DC, AC, Transient and Monte Carlo SPICE analysis', 'Current mirrors and active loads']
      },
      {
        id: 'ams-w2',
        week: 'Week 3-4',
        title: 'Operational Amplifier Design',
        duration: '14 hours',
        lessons: ['Differential pair design and common-mode rejection', 'Frequency compensation and phase margin optimization', 'Slew rate, noise, and power dissipation optimization']
      },
      {
        id: 'ams-w3',
        week: 'Week 5-6',
        title: 'Analog Layout & Physical Sign-off',
        duration: '14 hours',
        lessons: ['Common-centroid and interdigitated layout techniques', 'Guard rings and substrate noise suppression', 'DRC/LVS verification and post-layout simulation with parasitics']
      }
    ],
    enrolled: false,
    progress: 0,
    labId: 'analog-mixed-lab',
    projectId: 'analog-pll',
    githubRepo: 'echiphub/analog-sky130-opamp'
  },
  {
    id: 5,
    slug: 'static-timing-analysis',
    status: 'completed',
    centre: 'Noida Center',
    kind: 'timing',
    category: 'eda',
    level: 'Advanced',
    format: 'workshop',
    duration: '4 Weeks',
    technologies: ['OpenSTA', 'SDC Constraints', 'STA', 'Liberty'],
    img: new URL('../../Website Image/DFT.jpeg', import.meta.url).href,
    title: 'Static Timing Analysis (STA) and Timing Sign-Off',
    desc: 'Master setup/hold slack calculations, clock skew, SDC constraints, and corner analysis.',
    longDesc: 'Learn the principles of static timing analysis required to guarantee silicon timing closure across multi-corner multi-mode (MCMM) operational conditions.',
    includes: {
      modulesCount: 4,
      labsCount: 1,
      projectsCount: 1,
      hasGithubRepo: true
    },
    learnPoints: [
      'Setup, hold, recovery, removal and clock gating checks',
      'Synopsys Design Constraints (SDC) creation and validation',
      'PVT corners, On-Chip Variation (OCV), and derating factors',
      'Crosstalk, SI (signal integrity), and glitch analysis',
      'Automated timing optimization scripts using OpenSTA'
    ],
    modules: [
      {
        id: 'sta-w1',
        week: 'Week 1',
        title: 'Timing Fundamentals & Paths',
        duration: '8 hours',
        lessons: ['Data arrival time vs Data required time', 'Setup and hold time margin math', 'Reg-to-reg, in-to-reg, reg-to-out timing paths']
      },
      {
        id: 'sta-w2',
        week: 'Week 2',
        title: 'SDC Timing Constraints',
        duration: '10 hours',
        lessons: ['create_clock, generated clocks and virtual clocks', 'set_input_delay, set_output_delay and load constraints', 'False paths and multicycle path exceptions']
      },
      {
        id: 'sta-w3',
        week: 'Week 3',
        title: 'Corners & Signal Integrity',
        duration: '10 hours',
        lessons: ['Process, voltage, and temperature (PVT) operating corners', 'Clock jitter, clock uncertainty and transition times', 'Crosstalk delay impact and glitch verification']
      },
      {
        id: 'sta-w4',
        week: 'Week 4',
        title: 'Timing Closure & Sign-off Lab',
        duration: '10 hours',
        lessons: ['OpenSTA report analysis and violation fixing', 'Buffer sizing and delay optimization passes', 'Final timing sign-off for tape-out']
      }
    ],
    enrolled: false,
    progress: 0,
    labId: 'timing-signoff-lab',
    projectId: 'timing-analysis-proj',
    githubRepo: 'echiphub/sta-timing-signoff'
  },
  {
    id: 6,
    slug: 'fpga-hardware-acceleration',
    status: 'upcoming',
    centre: 'Ropar Center',
    kind: 'fpga',
    category: 'fpga',
    level: 'Intermediate',
    format: 'course',
    duration: '6 Weeks',
    technologies: ['FPGA', 'Verilog', 'Yosys', 'nextpnr', 'Xilinx/Ice40'],
    img: new URL('../../Website Image/SOC.jpeg', import.meta.url).href,
    title: 'FPGA Prototyping & Hardware Acceleration',
    desc: 'Implement DSP filters, memory controllers, and neural net accelerators on FPGAs.',
    longDesc: 'Learn the open-source FPGA toolchain (Yosys + nextpnr + Project IceStorm/Trellis) and synthesize complex computational algorithms directly onto FPGA silicon.',
    includes: {
      modulesCount: 6,
      labsCount: 2,
      projectsCount: 2,
      hasGithubRepo: true
    },
    learnPoints: [
      'FPGA architecture: LUTs, flip-flops, BRAM, and DSP slices',
      'Open-source toolchains: Yosys synthesis and nextpnr place-and-route',
      'Systolic array matrix multiplication for ML inference',
      'AXI4-Stream data transfer pipelines',
      'Hardware-software co-design and timing constraints'
    ],
    modules: [
      {
        id: 'fpga-w1',
        week: 'Week 1-2',
        title: 'FPGA Architecture & Open Toolchains',
        duration: '10 hours',
        lessons: ['Configurable logic blocks & routing fabrics', 'Writing synthesizable Verilog for FPGA targets', 'Running Yosys synthesis and nextpnr routing']
      },
      {
        id: 'fpga-w2',
        week: 'Week 3-4',
        title: 'DSP & Memory Pipelines',
        duration: '12 hours',
        lessons: ['Block RAM instantiation and dual-port memory', 'DSP slice arithmetic: MAC operations and FIR filtering', 'Pipelined floating point / fixed point math units']
      },
      {
        id: 'fpga-w3',
        week: 'Week 5-6',
        title: 'Systolic Array & Accelerator Build',
        duration: '14 hours',
        lessons: ['2D Systolic array design for matrix multiplication', 'UART/SPI control interface to host PC', 'Hardware verification on actual FPGA boards']
      }
    ],
    enrolled: false,
    progress: 0,
    labId: 'rtl-sim-lab',
    projectId: 'axi-interface',
    githubRepo: 'echiphub/fpga-matrix-multiplier'
  }
]

// ── Virtual Labs with Live Statuses ──
export type LabLiveStatus = 'available' | 'in-progress' | 'recently-updated' | 'coming-soon'

export interface VirtualLab {
  id: string
  title: string
  slug: string
  category: string
  technologies: string[]
  image: string
  desc: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  tools: string[]
  liveStatus: LabLiveStatus
  commandPreview: string
  defaultCode?: string
  sampleLogs: string[]
  hasWaveform?: boolean
  relatedCourseId: number
  relatedProjectId: string
  githubUrl: string
}

export const VIRTUAL_LABS: VirtualLab[] = [
  {
    id: 'rtl-sim-lab',
    slug: 'rtl-simulation-lab',
    title: 'RTL Simulation Lab',
    category: 'RTL & Logic',
    technologies: ['Verilog', 'SystemVerilog', 'Icarus Verilog', 'GTKWave'],
    image: new URL('../../Website Image/RTL-1.jpeg', import.meta.url).href,
    desc: 'Write synthesizable Verilog/SystemVerilog modules, run testbenches, generate VCD waveforms, and debug timing diagrams.',
    difficulty: 'Beginner',
    estimatedTime: '45 min',
    tools: ['Icarus Verilog', 'GTKWave', 'Verilator'],
    liveStatus: 'available',
    commandPreview: 'iverilog -g2012 -o sim.out counter.v tb_counter.v && vvp sim.out',
    defaultCode: `// 4-bit Synchronous Up/Down Counter with Async Reset
module counter (
    input  wire       clk,
    input  wire       rst_n,
    input  wire       up_down,
    output reg  [3:0] count
);
    always @(posedge clk or negedge rst_n) begin
        if (!rst_n)
            count <= 4'b0000;
        else if (up_down)
            count <= count + 1'b1;
        else
            count <= count - 1'b1;
    end
endmodule`,
    sampleLogs: [
      '[IVERILOG] Parsing verilog source: counter.v...',
      '[IVERILOG] Elaborating top module testbench...',
      '[VVP] Running simulation kernel...',
      '[VCD] Waveform dump started: waveform.vcd (4 signals registered)',
      '[TB_CHECK] PASS: Counter reset verified at t=10ns',
      '[TB_CHECK] PASS: Up-counting verified 0x0 -> 0xF at t=170ns',
      '[TB_CHECK] PASS: Down-counting verified 0xF -> 0x0 at t=330ns',
      '[SIM_STATUS] All 12 assertions passed. Simulation completed with 0 errors.'
    ],
    hasWaveform: true,
    relatedCourseId: 1,
    relatedProjectId: 'digital-counter',
    githubUrl: 'https://github.com/echiphub/rtl-sim-starter'
  },
  {
    id: 'openlane-pd-lab',
    slug: 'openlane-physical-design',
    title: 'OpenLane Physical Design Lab',
    category: 'Physical Design',
    technologies: ['OpenLane', 'Yosys', 'Magic', 'KLayout', 'OpenROAD'],
    image: new URL('../../Website Image/05-1.jpg', import.meta.url).href,
    desc: 'Execute complete RTL-to-GDSII ASIC physical design flow: synthesis, floorplan, CTS, routing, and DRC sign-off.',
    difficulty: 'Advanced',
    estimatedTime: '90 min',
    tools: ['OpenLane', 'Yosys', 'OpenROAD', 'Magic', 'KLayout'],
    liveStatus: 'recently-updated',
    commandPreview: './flow.tcl -design spimaster -tag run_sky130 -overwrite',
    defaultCode: `# OpenLane Configuration (config.json)
{
  "DESIGN_NAME": "spimaster",
  "VERILOG_FILES": "dir::src/spimaster.v",
  "CLOCK_PORT": "clk",
  "CLOCK_PERIOD": 10.0,
  "FP_CORE_UTIL": 45,
  "PL_TARGET_DENSITY": 0.55,
  "PDK": "sky130A"
}`,
    sampleLogs: [
      '[STAGE 1] Yosys Synthesis: 482 cells inferred, 0 unmapped gates',
      '[STAGE 2] Floorplan: Core Area 180um x 180um, Die Area 220um x 220um',
      '[STAGE 3] PDN Generation: VDD/VSS metal straps inserted (layers met4, met5)',
      '[STAGE 4] Global Placement: Target density 55.0% achieved',
      '[STAGE 5] TritonCTS: Clock skew = 42ps, Max latency = 310ps',
      '[STAGE 6] Detailed Routing: 0 DRC violations across 18,420 routing segments',
      '[STAGE 7] Magic DRC/LVS: Clean sign-off! Output: spimaster.gds (3.4 MB)'
    ],
    hasWaveform: false,
    relatedCourseId: 2,
    relatedProjectId: 'openlane-gdsii',
    githubUrl: 'https://github.com/echiphub/openlane-asic-flow'
  },
  {
    id: 'riscv-bringup-lab',
    slug: 'riscv-core-bringup',
    title: 'RISC-V Core Bring-up Lab',
    category: 'Computer Architecture',
    technologies: ['RISC-V', 'Verilog', 'RV32I', 'GCC Toolchain'],
    image: new URL('../../Website Image/SOC.jpeg', import.meta.url).href,
    desc: 'Load bare-metal C programs into a custom 5-stage RISC-V RV32I pipeline and observe register file state changes.',
    difficulty: 'Intermediate',
    estimatedTime: '60 min',
    tools: ['Spike Simulator', 'GCC RISC-V', 'Verilator'],
    liveStatus: 'available',
    commandPreview: 'riscv32-unknown-elf-gcc -O2 -march=rv32i main.c -o test.elf && sim_rv32i test.elf',
    defaultCode: `// Bare-metal C test running on RISC-V RV32I Core
#define UART_TX_REG  (*(volatile unsigned int*)0x80000000)

void main(void) {
    const char* msg = "Hello from eChipHub RISC-V RV32I Core!\\n";
    while (*msg) {
        UART_TX_REG = *msg++;
    }
}`,
    sampleLogs: [
      '[BOOTLOADER] Initializing memory from address 0x00000000...',
      '[CORE] PC=0x00000000: lui sp, 0x10000',
      '[CORE] PC=0x00000004: jal ra, 0x00000028 <main>',
      '[PIPELINE] Execution cycle 124: UART_TX write observed \'H\' (0x48)',
      '[PIPELINE] Execution cycle 128: UART_TX write observed \'e\' (0x65)',
      '[PIPELINE] Execution cycle 132: UART_TX write observed \'l\' (0x6C)',
      '[STATUS] Program reached exit trap at cycle 840. Total instructions: 612. CPI: 1.37.'
    ],
    hasWaveform: true,
    relatedCourseId: 3,
    relatedProjectId: 'riscv-cpu',
    githubUrl: 'https://github.com/echiphub/riscv-rv32i-core'
  },
  {
    id: 'analog-mixed-lab',
    slug: 'analog-mixed-signal',
    title: 'Analog & Mixed-Signal SPICE Lab',
    category: 'Analog & RF',
    technologies: ['SPICE', 'Ngspice', 'Xschem', 'Sky130'],
    image: new URL('../../Website Image/tile1-1024x683.jpeg', import.meta.url).href,
    desc: 'Run AC frequency response, transient analysis, and phase margin simulations on CMOS two-stage operational amplifiers.',
    difficulty: 'Intermediate',
    estimatedTime: '50 min',
    tools: ['Ngspice', 'Xschem', 'Gaw Waveform Viewer'],
    liveStatus: 'available',
    commandPreview: 'ngspice -b -r opamp_ac.raw opamp_test.spice',
    defaultCode: `* Two-Stage CMOS Op-Amp AC Analysis
.include "sky130_fd_pr/models/sky130.lib.spice" tt
Vdd VDD 0 DC 1.8
Vss VSS 0 DC 0
Vin+ INP 0 DC 0.9 AC 1.0
Vin- INM 0 DC 0.9 AC 0
X1 INP INM OUT VDD VSS two_stage_opamp
CL OUT 0 5pF
.ac dec 20 10 1G
.control
run
plot vdb(OUT) vp(OUT)
.endc
.end`,
    sampleLogs: [
      '[NGSPICE] Loading SkyWater 130nm TT typical model cards...',
      '[NGSPICE] Operating point calculation: VDD=1.8V, IDD=142uA',
      '[AC_ANALYSIS] Sweep from 10 Hz to 1 GHz (140 points computed)',
      '[RESULTS] DC Open-Loop Gain = 74.2 dB',
      '[RESULTS] Unity-Gain Bandwidth (UGBW) = 48.6 MHz',
      '[RESULTS] Phase Margin = 64.5 degrees (Highly stable)',
      '[RESULTS] Common-Mode Rejection Ratio (CMRR) = 88 dB'
    ],
    hasWaveform: true,
    relatedCourseId: 4,
    relatedProjectId: 'analog-adc',
    githubUrl: 'https://github.com/echiphub/analog-sky130-opamp'
  },
  {
    id: 'timing-signoff-lab',
    slug: 'timing-sign-off',
    title: 'Timing Sign-off & STA Lab',
    category: 'Timing & EDA',
    technologies: ['OpenSTA', 'STA', 'SDC Constraints'],
    image: new URL('../../Website Image/DFT.jpeg', import.meta.url).href,
    desc: 'Analyze multi-corner timing reports, check clock domain crossing paths, and eliminate setup/hold violations.',
    difficulty: 'Advanced',
    estimatedTime: '40 min',
    tools: ['OpenSTA', 'SDC Analyzer'],
    liveStatus: 'in-progress',
    commandPreview: 'sta timing_analysis.tcl',
    defaultCode: `# OpenSTA SDC & Analysis Script
read_liberty sky130_fd_sc_hd__tt_025C_1v80.lib
read_verilog synth_netlist.v
link_design top_core
read_sdc constraints.sdc
report_checks -path_delay max -fields {input slew cap} -digits 3
report_checks -path_delay min -fields {input slew cap} -digits 3`,
    sampleLogs: [
      '[STA] Reading liberty standard cell timing libraries...',
      '[STA] Linked design: top_core (1,240 instances, 1,480 nets)',
      '[STA] Clock \'clk\' defined at 100.0 MHz (Period: 10.000ns)',
      '[PATH_MAX] Worst Setup Slack: +0.482ns (MET - PASS)',
      '[PATH_MIN] Worst Hold Slack: +0.094ns (MET - PASS)',
      '[STA_SUMMARY] Setup violations: 0 | Hold violations: 0 | Max Cap violations: 0',
      '[STATUS] Timing closure achieved across nominal and corner operating conditions.'
    ],
    hasWaveform: false,
    relatedCourseId: 5,
    relatedProjectId: 'timing-analysis-proj',
    githubUrl: 'https://github.com/echiphub/sta-timing-signoff'
  },
  {
    id: 'gdsii-tapeout-lab',
    slug: 'gdsii-tape-out',
    title: 'GDSII Tape-out & DRC Lab',
    category: 'Fabrication',
    technologies: ['Magic', 'Netgen', 'KLayout', 'DRC', 'LVS'],
    image: new URL('../../Website Image/08.png', import.meta.url).href,
    desc: 'Verify geometric design rules (DRC), run layout-versus-schematic (LVS), and inspect final fabrication GDSII masks.',
    difficulty: 'Advanced',
    estimatedTime: '60 min',
    tools: ['Magic', 'Netgen', 'KLayout'],
    liveStatus: 'available',
    commandPreview: 'magic -dnull -noconsole run_drc.tcl',
    defaultCode: `# Magic DRC & GDSII Stream-out
gds read design_chip.gds
load design_chip
drc check
drc catchup
drc count
puts "DRC Errors: [drc list count total]"`,
    sampleLogs: [
      '[MAGIC] Loading technology file: sky130A.tech...',
      '[MAGIC] Reading layout stream: design_chip.gds (3,410,240 bytes)...',
      '[DRC] Checking metal spacing, enclosure and antenna rules...',
      '[DRC] DRC clean! Error count: 0',
      '[NETGEN] Running LVS netlist comparison (Schematic vs Layout)...',
      '[NETGEN] Equivalence established: Netlists match with 0 discrepancies.',
      '[SIGNOFF] Chip ready for foundry wafer tape-out (Caravel / MPW Harness).'
    ],
    hasWaveform: false,
    relatedCourseId: 2,
    relatedProjectId: 'openlane-gdsii',
    githubUrl: 'https://github.com/echiphub/gds-tapeout-signoff'
  }
]

// ── Open-Source Projects (Project → Lab → GitHub Bridge) ──
export interface OpenSourceProject {
  id: string
  name: string
  shortDesc: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  stars: number
  forks: number
  technologies: string[]
  image: string
  githubUrl: string
  relatedCourseId?: number
  relatedLabId: string
  targetWhatYouBuild: string
}

export const OPEN_SOURCE_PROJECTS: OpenSourceProject[] = [
  {
    id: 'riscv-cpu',
    name: 'RISC-V CPU',
    shortDesc: '32-bit pipelined CPU core with hazard unit, branch prediction and Wishbone bus.',
    difficulty: 'Intermediate',
    stars: 184,
    forks: 46,
    technologies: ['RISC-V', 'Verilog', 'CPU'],
    image: new URL('../../Website Image/Risc-v.png', import.meta.url).href,
    githubUrl: 'https://github.com/echiphub/riscv-rv32i-core',
    relatedCourseId: 3,
    relatedLabId: 'riscv-bringup-lab',
    targetWhatYouBuild: '5-stage RV32I processor executing bare-metal C programs'
  },
  {
    id: 'uart-controller',
    name: 'UART Controller',
    shortDesc: 'Synthesizable UART Tx/Rx controller with configurable baud rate generators and 16-byte FIFO.',
    difficulty: 'Beginner',
    stars: 96,
    forks: 24,
    technologies: ['Verilog', 'RTL', 'FPGA'],
    image: new URL('../../Website Image/verilog.png', import.meta.url).href,
    githubUrl: 'https://github.com/echiphub/uart-verilog-controller',
    relatedCourseId: 1,
    relatedLabId: 'rtl-sim-lab',
    targetWhatYouBuild: 'Full-duplex serial communication interface'
  },
  {
    id: 'axi-interface',
    name: 'AXI Interface',
    shortDesc: 'AXI4-Lite and AXI4-Stream slave/master memory arbiter for SoC IP core integration.',
    difficulty: 'Intermediate',
    stars: 142,
    forks: 38,
    technologies: ['Verilog', 'AXI4', 'SoC'],
    image: new URL('../../Website Image/Asset-1.png', import.meta.url).href,
    githubUrl: 'https://github.com/echiphub/axi4-memory-controller',
    relatedCourseId: 6,
    relatedLabId: 'rtl-sim-lab',
    targetWhatYouBuild: 'Standard on-chip bus interconnect module'
  },
  {
    id: 'digital-counter',
    name: 'Digital Counter',
    shortDesc: 'Synchronous parameterized up/down counter with overflow detection and SVA verification.',
    difficulty: 'Beginner',
    stars: 64,
    forks: 18,
    technologies: ['Verilog', 'RTL'],
    image: new URL('../../Website Image/RTL-1.jpeg', import.meta.url).href,
    githubUrl: 'https://github.com/echiphub/rtl-verification-suite',
    relatedCourseId: 1,
    relatedLabId: 'rtl-sim-lab',
    targetWhatYouBuild: 'Synthesizable digital counter testbench'
  },
  {
    id: 'analog-adc',
    name: '8-bit SAR ADC',
    shortDesc: 'Successive approximation register analog-to-digital converter on SkyWater 130nm PDK.',
    difficulty: 'Advanced',
    stars: 110,
    forks: 32,
    technologies: ['SPICE', 'Analog', 'Sky130'],
    image: new URL('../../Website Image/tile1-1024x683.jpeg', import.meta.url).href,
    githubUrl: 'https://github.com/echiphub/analog-sky130-opamp',
    relatedCourseId: 4,
    relatedLabId: 'analog-mixed-lab',
    targetWhatYouBuild: 'Mixed-signal data converter schematic & layout'
  },
  {
    id: 'analog-pll',
    name: 'Phase-Locked Loop (PLL)',
    shortDesc: 'Charge-pump PLL with phase frequency detector (PFD) and VCO for on-chip clock generation.',
    difficulty: 'Advanced',
    stars: 128,
    forks: 35,
    technologies: ['SPICE', 'Analog', 'AMS'],
    image: new URL('../../Website Image/Neon Mixed-Signal IC Design Infographic.png', import.meta.url).href,
    githubUrl: 'https://github.com/echiphub/analog-sky130-opamp',
    relatedCourseId: 4,
    relatedLabId: 'analog-mixed-lab',
    targetWhatYouBuild: 'Gigahertz clock multiplier & frequency synthesizer'
  },
  {
    id: 'openlane-gdsii',
    name: 'OpenLane RTL-to-GDSII',
    shortDesc: 'Automated ASIC physical design hardening script integrating synthesis, CTS, routing & DRC.',
    difficulty: 'Advanced',
    stars: 215,
    forks: 62,
    technologies: ['OpenLane', 'Sky130', 'GDSII'],
    image: new URL('../../Website Image/Neon OpenLane EDA Flow Chip Infographic.png', import.meta.url).href,
    githubUrl: 'https://github.com/echiphub/openlane-asic-flow',
    relatedCourseId: 2,
    relatedLabId: 'openlane-pd-lab',
    targetWhatYouBuild: 'Tape-out ready silicon layout macros'
  },
  {
    id: 'timing-analysis-proj',
    name: 'Timing Analysis Engine',
    shortDesc: 'Multi-corner setup and hold slack report parser and SDC constraints validation suite.',
    difficulty: 'Intermediate',
    stars: 88,
    forks: 22,
    technologies: ['STA', 'OpenSTA', 'EDA'],
    image: new URL('../../Website Image/DFT.jpeg', import.meta.url).href,
    githubUrl: 'https://github.com/echiphub/sta-timing-signoff',
    relatedCourseId: 5,
    relatedLabId: 'timing-signoff-lab',
    targetWhatYouBuild: 'Automated timing sign-off verification workflow'
  }
]

// ── EDA Tools Explorer Dataset ──
export interface EDATool {
  id: string
  name: string
  category: string
  desc: string
  coursesCount: number
  labsCount: number
  projectsCount: number
  primaryCommand: string
  githubUrl: string
}

export const EDA_TOOLS: EDATool[] = [
  {
    id: 'yosys',
    name: 'Yosys',
    category: 'Synthesis',
    desc: 'Open-source framework for Verilog RTL synthesis and formal netlist verification.',
    coursesCount: 3,
    labsCount: 2,
    projectsCount: 4,
    primaryCommand: 'yosys -p "synth -top my_chip; write_verilog synth.v"',
    githubUrl: 'https://github.com/YosysHQ/yosys'
  },
  {
    id: 'openlane',
    name: 'OpenLane',
    category: 'ASIC Flow',
    desc: 'Automated RTL to GDSII flow built on OpenROAD, Yosys, Magic, and KLayout.',
    coursesCount: 2,
    labsCount: 3,
    projectsCount: 5,
    primaryCommand: './flow.tcl -design my_chip -tag run_sky130',
    githubUrl: 'https://github.com/The-OpenROAD-Project/OpenLane'
  },
  {
    id: 'klayout',
    name: 'KLayout',
    category: 'Layout & Mask',
    desc: 'Fast GDSII and OASIS mask layout viewer and editor with Python & Ruby scripting.',
    coursesCount: 2,
    labsCount: 2,
    projectsCount: 3,
    primaryCommand: 'klayout chip_layout.gds',
    githubUrl: 'https://github.com/KLayout/klayout'
  },
  {
    id: 'magic',
    name: 'Magic',
    category: 'VLSI & DRC',
    desc: 'Interactive VLSI layout tool renowned for continuous Design Rule Checking (DRC).',
    coursesCount: 2,
    labsCount: 2,
    projectsCount: 3,
    primaryCommand: 'magic -dnull -noconsole run_drc.tcl',
    githubUrl: 'https://github.com/RTimothyEdwards/magic'
  },
  {
    id: 'icarus-verilog',
    name: 'Icarus Verilog',
    category: 'Simulation',
    desc: 'IEEE-1364 standard Verilog simulation and synthesis tool generating VCD waveforms.',
    coursesCount: 3,
    labsCount: 3,
    projectsCount: 4,
    primaryCommand: 'iverilog -g2012 -o test.vvp design.v tb.v && vvp test.vvp',
    githubUrl: 'https://github.com/steveicarus/iverilog'
  },
  {
    id: 'gtkwave',
    name: 'GTKWave',
    category: 'Waveform Debug',
    desc: 'Fully featured GTK+ based wave viewer for LXT, LXT2, VZT, FST, and VCD files.',
    coursesCount: 2,
    labsCount: 2,
    projectsCount: 3,
    primaryCommand: 'gtkwave waveform.vcd',
    githubUrl: 'https://github.com/gtkwave/gtkwave'
  },
  {
    id: 'spice',
    name: 'Ngspice',
    category: 'Analog Simulation',
    desc: 'Mixed-level, mixed-signal circuit simulator for CMOS small-signal and transient analysis.',
    coursesCount: 2,
    labsCount: 2,
    projectsCount: 2,
    primaryCommand: 'ngspice -b circuit.spice',
    githubUrl: 'https://github.com/imr/ngspice'
  },
  {
    id: 'opensta',
    name: 'OpenSTA',
    category: 'Timing Sign-Off',
    desc: 'Parquet-capable gate-level static timing analysis engine for multi-corner SDC checks.',
    coursesCount: 2,
    labsCount: 2,
    projectsCount: 2,
    primaryCommand: 'sta run_timing.tcl',
    githubUrl: 'https://github.com/The-OpenROAD-Project/OpenSTA'
  }
]

// ── Skills Discovery Dataset ──
export interface SkillItem {
  id: string
  name: string
  iconName: string
  desc: string
  category: CourseCategory
}

export const SKILL_ITEMS: SkillItem[] = [
  { id: 'rtl-design', name: 'RTL Design', iconName: 'CircuitBoard', desc: 'Synthesizable Verilog logic modeling', category: 'rtl' },
  { id: 'verification', name: 'Verification', iconName: 'Gauge', desc: 'SystemVerilog testbenches & assertions', category: 'verification' },
  { id: 'digital-logic', name: 'Digital Logic', iconName: 'Cpu', desc: 'Boolean gates, FSMs & pipelining', category: 'rtl' },
  { id: 'cpu-design', name: 'CPU Design', iconName: 'Cpu', desc: 'RISC-V microarchitecture & execution units', category: 'riscv' },
  { id: 'physical-design', name: 'Physical Design', iconName: 'Layers3', desc: 'Floorplanning, CTS & routing flows', category: 'physical-design' },
  { id: 'timing-analysis', name: 'Timing Analysis', iconName: 'Clock', desc: 'Static timing analysis & SDC constraints', category: 'eda' },
  { id: 'analog-design', name: 'Analog Design', iconName: 'Activity', desc: 'Op-amps, PLLs & SPICE simulation', category: 'analog' },
  { id: 'eda-automation', name: 'EDA Automation', iconName: 'Wrench', desc: 'Tcl/Python automation for chip tape-out', category: 'eda' },
  { id: 'chip-tapeout', name: 'Chip Tape-out', iconName: 'ShieldCheck', desc: 'GDSII generation, DRC & LVS sign-off', category: 'physical-design' }
]

// ── Developer Achievements Dataset ──
export interface AchievementBadge {
  id: string
  title: string
  desc: string
  icon: string
  unlocked: boolean
  progress: string
}

export const DEVELOPER_ACHIEVEMENTS: AchievementBadge[] = [
  { id: 'ach-1', title: 'First Lab Completed', desc: 'Ran first browser-based EDA simulation kernel', icon: '🏆', unlocked: true, progress: '1/1' },
  { id: 'ach-2', title: 'First Project Built', desc: 'Synthesized Verilog RTL module without errors', icon: '🚀', unlocked: true, progress: '1/1' },
  { id: 'ach-3', title: 'RTL Explorer', desc: 'Verified 4 digital blocks with SystemVerilog assertions', icon: '⚡', unlocked: true, progress: '4/4' },
  { id: 'ach-4', title: 'RISC-V Builder', desc: 'Executed bare-metal C code on RV32I CPU core', icon: '💻', unlocked: false, progress: '0/1' },
  { id: 'ach-5', title: 'OpenLane Explorer', desc: 'Generated DRC clean GDSII ASIC layout on Sky130', icon: '🔬', unlocked: false, progress: '1/3' },
  { id: 'ach-6', title: 'GitHub Contributor', desc: 'Starred or forked an official eChipHub repository', icon: '🐙', unlocked: true, progress: '1/1' },
  { id: 'ach-7', title: '5 Labs Completed', desc: 'Completed 5 cloud virtual laboratory experiments', icon: '🎓', unlocked: false, progress: '3/5' }
]

// ── Dynamic Spotlight Dataset ──
export interface SpotlightItem {
  type: 'Trending Project' | 'Popular Course' | 'New Lab' | 'Recently Updated Repo' | 'Upcoming Workshop'
  title: string
  subtitle: string
  tag: string
  targetHash: string
}

export const SPOTLIGHT_ITEMS: SpotlightItem[] = [
  {
    type: 'Trending Project',
    title: 'RISC-V 5-Stage RV32I Core',
    subtitle: '⭐ 184 Stars • Full synthesizable pipelined CPU with Wishbone memory bus',
    tag: 'OPEN SOURCE',
    targetHash: '#projects'
  },
  {
    type: 'Popular Course',
    title: 'Physical Design and OpenLane EDA Flow',
    subtitle: '8 Weeks • Automated RTL-to-GDSII ASIC flow on SkyWater 130nm PDK',
    tag: 'LIVE NOW',
    targetHash: '#courses'
  },
  {
    type: 'New Lab',
    title: 'Analog & Mixed-Signal SPICE Lab',
    subtitle: 'Interactive Ngspice AC frequency response and phase margin simulator',
    tag: 'CLOUD LAB',
    targetHash: '#labs'
  },
  {
    type: 'Recently Updated Repo',
    title: 'echiphub / openlane-asic-flow',
    subtitle: 'Updated 1 day ago with Sky130A automated hardening recipe templates',
    tag: 'GITHUB',
    targetHash: '#github'
  },
  {
    type: 'Upcoming Workshop',
    title: 'RISC-V Microarchitecture & Pipelined Core Bring-up',
    subtitle: 'April 2026 • Hands-on instruction set architecture and FPGA bring-up',
    tag: 'WORKSHOP',
    targetHash: '#workshops'
  }
]

// ── GitHub Repositories ──
export type GitHubCategory = 'featured' | 'trending' | 'recent' | 'popular' | 'beginner' | 'active'

export interface GitHubRepo {
  id: string
  name: string
  category: GitHubCategory
  description: string
  language: string
  languageColor: string
  stars: number
  forks: number
  issues: number
  contributors: number
  lastUpdated: string
  githubUrl: string
  topics: string[]
}

export const GITHUB_REPOS: GitHubRepo[] = [
  {
    id: 'echiphub-riscv-core',
    name: 'echiphub / riscv-rv32i-core',
    category: 'popular',
    description: 'Clean, synthesizable 5-stage RISC-V RV32I processor core with full test suite and FPGA porting guides.',
    language: 'Verilog',
    languageColor: '#84b5fe',
    stars: 184,
    forks: 46,
    issues: 3,
    contributors: 8,
    lastUpdated: '2 days ago',
    githubUrl: 'https://github.com/echiphub/riscv-rv32i-core',
    topics: ['riscv', 'cpu', 'verilog', 'fpga', 'microarchitecture']
  },
  {
    id: 'echiphub-openlane-flow',
    name: 'echiphub / openlane-asic-flow',
    category: 'featured',
    description: 'Turnkey RTL-to-GDSII ASIC physical design recipes for SkyWater 130nm using the OpenLane EDA toolchain.',
    language: 'Tcl / Python',
    languageColor: '#3572A5',
    stars: 215,
    forks: 62,
    issues: 5,
    contributors: 12,
    lastUpdated: '1 day ago',
    githubUrl: 'https://github.com/echiphub/openlane-asic-flow',
    topics: ['openlane', 'skywater130', 'gdsii', 'eda', 'asic']
  },
  {
    id: 'echiphub-rtl-verification',
    name: 'echiphub / rtl-verification-suite',
    category: 'beginner',
    description: 'Beginner-friendly SystemVerilog assertions (SVA), coverage groups, and automated testbench examples.',
    language: 'SystemVerilog',
    languageColor: '#2b5b84',
    stars: 120,
    forks: 34,
    issues: 1,
    contributors: 6,
    lastUpdated: '3 days ago',
    githubUrl: 'https://github.com/echiphub/rtl-verification-suite',
    topics: ['systemverilog', 'verification', 'sva', 'testbench']
  },
  {
    id: 'echiphub-analog-opamp',
    name: 'echiphub / analog-sky130-opamp',
    category: 'active',
    description: 'Schematic, SPICE simulations, and Magic layout of a two-stage operational amplifier on SkyWater 130nm.',
    language: 'SPICE',
    languageColor: '#e34c26',
    stars: 92,
    forks: 28,
    issues: 2,
    contributors: 5,
    lastUpdated: '5 days ago',
    githubUrl: 'https://github.com/echiphub/analog-sky130-opamp',
    topics: ['analog', 'spice', 'opamp', 'sky130', 'xschem']
  },
  {
    id: 'echiphub-sta-timing',
    name: 'echiphub / sta-timing-signoff',
    category: 'recent',
    description: 'Static timing analysis (STA) automation scripts using OpenSTA for setup/hold slack checks and SDC generation.',
    language: 'Tcl',
    languageColor: '#e4cc98',
    stars: 78,
    forks: 19,
    issues: 0,
    contributors: 4,
    lastUpdated: '12 hours ago',
    githubUrl: 'https://github.com/echiphub/sta-timing-signoff',
    topics: ['sta', 'timing', 'sdc', 'opensta']
  },
  {
    id: 'echiphub-matrix-multiplier',
    name: 'echiphub / fpga-matrix-multiplier',
    category: 'trending',
    description: 'Systolic array matrix multiplication engine in synthesizable Verilog for AI/ML FPGA acceleration.',
    language: 'Verilog',
    languageColor: '#84b5fe',
    stars: 148,
    forks: 39,
    issues: 4,
    contributors: 7,
    lastUpdated: '4 days ago',
    githubUrl: 'https://github.com/echiphub/fpga-matrix-multiplier',
    topics: ['ai-hardware', 'systolic-array', 'fpga', 'verilog']
  }
]

// ── Interactive Learning Roadmap (RTL → GDSII 9-Stage Flow) ──
export interface RoadmapStage {
  id: string
  step: string
  name: string
  shortDesc: string
  tools: string[]
  coursesCount: number
  labsCount: number
  projectsCount: number
  courseId: number
  labId: string
  projectId: string
  githubUrl: string
}

export const ROADMAP_STAGES: RoadmapStage[] = [
  {
    id: 'rtl',
    step: '01',
    name: 'RTL',
    shortDesc: 'Capture digital logic behavior using synthesizable Verilog and SystemVerilog.',
    tools: ['Verilog', 'SystemVerilog', 'Icarus Verilog'],
    coursesCount: 3,
    labsCount: 2,
    projectsCount: 4,
    courseId: 1,
    labId: 'rtl-sim-lab',
    projectId: 'digital-counter',
    githubUrl: 'https://github.com/echiphub/rtl-verification-suite'
  },
  {
    id: 'verification',
    step: '02',
    name: 'Verification',
    shortDesc: 'Write self-checking testbenches, SVA assertions, and achieve 100% functional coverage.',
    tools: ['SystemVerilog', 'SVA', 'Verilator', 'GTKWave'],
    coursesCount: 2,
    labsCount: 2,
    projectsCount: 2,
    courseId: 1,
    labId: 'rtl-sim-lab',
    projectId: 'uart-controller',
    githubUrl: 'https://github.com/echiphub/rtl-verification-suite'
  },
  {
    id: 'synthesis',
    step: '03',
    name: 'Synthesis',
    shortDesc: 'Convert behavioral RTL logic into gate-level netlists mapped to target standard cell libraries.',
    tools: ['Yosys', 'ABC', 'Liberty (.lib)'],
    coursesCount: 2,
    labsCount: 2,
    projectsCount: 3,
    courseId: 2,
    labId: 'openlane-pd-lab',
    projectId: 'openlane-gdsii',
    githubUrl: 'https://github.com/echiphub/openlane-asic-flow'
  },
  {
    id: 'floorplanning',
    step: '04',
    name: 'Floorplan',
    shortDesc: 'Define core/die boundaries, I/O pin positions, macro placement, and power grid mesh.',
    tools: ['OpenROAD', 'OpenLane', 'LEF'],
    coursesCount: 2,
    labsCount: 2,
    projectsCount: 2,
    courseId: 2,
    labId: 'openlane-pd-lab',
    projectId: 'openlane-gdsii',
    githubUrl: 'https://github.com/echiphub/openlane-asic-flow'
  },
  {
    id: 'placement',
    step: '05',
    name: 'Placement',
    shortDesc: 'Perform global and detailed placement of standard cells to optimize wirelength and congestion.',
    tools: ['RePLace', 'OpenROAD'],
    coursesCount: 2,
    labsCount: 2,
    projectsCount: 2,
    courseId: 2,
    labId: 'openlane-pd-lab',
    projectId: 'openlane-gdsii',
    githubUrl: 'https://github.com/echiphub/openlane-asic-flow'
  },
  {
    id: 'routing',
    step: '06',
    name: 'Routing',
    shortDesc: 'Clock tree synthesis (TritonCTS) followed by global FastRoute and detailed TritonRoute interconnect.',
    tools: ['TritonCTS', 'TritonRoute', 'OpenROAD'],
    coursesCount: 2,
    labsCount: 2,
    projectsCount: 2,
    courseId: 2,
    labId: 'openlane-pd-lab',
    projectId: 'openlane-gdsii',
    githubUrl: 'https://github.com/echiphub/openlane-asic-flow'
  },
  {
    id: 'timing-signoff',
    step: '07',
    name: 'Timing',
    shortDesc: 'Static timing analysis (STA) verifying setup/hold constraints across all PVT corners.',
    tools: ['OpenSTA', 'SDC Constraints'],
    coursesCount: 1,
    labsCount: 1,
    projectsCount: 1,
    courseId: 5,
    labId: 'timing-signoff-lab',
    projectId: 'timing-analysis-proj',
    githubUrl: 'https://github.com/echiphub/sta-timing-signoff'
  },
  {
    id: 'signoff',
    step: '08',
    name: 'Sign-off',
    shortDesc: 'Design Rule Check (DRC) and Layout Versus Schematic (LVS) verification.',
    tools: ['Magic', 'Netgen'],
    coursesCount: 2,
    labsCount: 2,
    projectsCount: 2,
    courseId: 2,
    labId: 'gdsii-tapeout-lab',
    projectId: 'openlane-gdsii',
    githubUrl: 'https://github.com/echiphub/openlane-asic-flow'
  },
  {
    id: 'gdsii',
    step: '09',
    name: 'GDSII',
    shortDesc: 'Final layout mask streaming ready for foundry tape-out and wafer manufacturing.',
    tools: ['KLayout', 'Magic', 'Sky130'],
    coursesCount: 2,
    labsCount: 3,
    projectsCount: 5,
    courseId: 2,
    labId: 'gdsii-tapeout-lab',
    projectId: 'openlane-gdsii',
    githubUrl: 'https://github.com/echiphub/openlane-asic-flow'
  }
]

// ── Technology Explorer ──
export interface TechItem {
  id: string
  name: string
  category: string
  iconName: string
  desc: string
  coursesCount: number
  labsCount: number
  projectsCount: number
  reposCount: number
  toolsCount: number
  relatedCourseId: number
  relatedLabId: string
  relatedProjectId: string
}

export const TECHNOLOGIES: TechItem[] = [
  {
    id: 'verilog',
    name: 'Verilog',
    category: 'HDL',
    iconName: 'CircuitBoard',
    desc: 'IEEE standard hardware description language for modeling digital systems and logic synthesizable circuits.',
    coursesCount: 3,
    labsCount: 2,
    projectsCount: 4,
    reposCount: 3,
    toolsCount: 3,
    relatedCourseId: 1,
    relatedLabId: 'rtl-sim-lab',
    relatedProjectId: 'digital-counter'
  },
  {
    id: 'systemverilog',
    name: 'SystemVerilog',
    category: 'HDL & Verification',
    iconName: 'Cpu',
    desc: 'Unified hardware design and verification language with assertions, classes, interfaces, and constrained random testbenches.',
    coursesCount: 2,
    labsCount: 1,
    projectsCount: 2,
    reposCount: 2,
    toolsCount: 2,
    relatedCourseId: 1,
    relatedLabId: 'rtl-sim-lab',
    relatedProjectId: 'uart-controller'
  },
  {
    id: 'riscv',
    name: 'RISC-V',
    category: 'Architecture',
    iconName: 'Cpu',
    desc: 'Open standard instruction set architecture (ISA) based on established reduced instruction set computer principles.',
    coursesCount: 2,
    labsCount: 1,
    projectsCount: 2,
    reposCount: 2,
    toolsCount: 2,
    relatedCourseId: 3,
    relatedLabId: 'riscv-bringup-lab',
    relatedProjectId: 'riscv-cpu'
  },
  {
    id: 'yosys',
    name: 'Yosys',
    category: 'EDA Synthesis',
    iconName: 'Gauge',
    desc: 'Open-source framework for Verilog RTL synthesis and formal verification of digital electronic circuits.',
    coursesCount: 2,
    labsCount: 2,
    projectsCount: 3,
    reposCount: 2,
    toolsCount: 1,
    relatedCourseId: 2,
    relatedLabId: 'openlane-pd-lab',
    relatedProjectId: 'openlane-gdsii'
  },
  {
    id: 'openlane',
    name: 'OpenLane',
    category: 'EDA Flow',
    iconName: 'Layers3',
    desc: 'Automated RTL to GDSII flow based on OpenROAD, Yosys, Magic, and KLayout for tape-out ready chips.',
    coursesCount: 4,
    labsCount: 3,
    projectsCount: 8,
    reposCount: 6,
    toolsCount: 5,
    relatedCourseId: 2,
    relatedLabId: 'openlane-pd-lab',
    relatedProjectId: 'openlane-gdsii'
  },
  {
    id: 'klayout',
    name: 'KLayout',
    category: 'Mask & Layout',
    iconName: 'MonitorPlay',
    desc: 'High-performance GDSII and OASIS mask layout viewer and editor with Python scripting capabilities.',
    coursesCount: 1,
    labsCount: 2,
    projectsCount: 1,
    reposCount: 1,
    toolsCount: 1,
    relatedCourseId: 2,
    relatedLabId: 'gdsii-tapeout-lab',
    relatedProjectId: 'openlane-gdsii'
  },
  {
    id: 'magic',
    name: 'Magic',
    category: 'VLSI Layout',
    iconName: 'LockKeyhole',
    desc: 'Interactive VLSI layout tool renowned for continuous Design Rule Checking (DRC) and circuit extraction.',
    coursesCount: 2,
    labsCount: 2,
    projectsCount: 2,
    reposCount: 2,
    toolsCount: 1,
    relatedCourseId: 2,
    relatedLabId: 'gdsii-tapeout-lab',
    relatedProjectId: 'openlane-gdsii'
  },
  {
    id: 'spice',
    name: 'SPICE',
    category: 'Analog Simulation',
    iconName: 'Activity',
    desc: 'General-purpose analog electronic circuit simulator for DC operating point, transient, and frequency analysis.',
    coursesCount: 1,
    labsCount: 1,
    projectsCount: 2,
    reposCount: 1,
    toolsCount: 1,
    relatedCourseId: 4,
    relatedLabId: 'analog-mixed-lab',
    relatedProjectId: 'analog-adc'
  },
  {
    id: 'fpga',
    name: 'FPGA',
    category: 'Prototyping',
    iconName: 'Sparkles',
    desc: 'Field-Programmable Gate Arrays for rapid digital design prototyping, hardware acceleration, and validation.',
    coursesCount: 2,
    labsCount: 1,
    projectsCount: 2,
    reposCount: 2,
    toolsCount: 2,
    relatedCourseId: 6,
    relatedLabId: 'rtl-sim-lab',
    relatedProjectId: 'axi-interface'
  },
  {
    id: 'linux',
    name: 'Linux',
    category: 'Operating System',
    iconName: 'Terminal',
    desc: 'The standard operating system environment for running professional open-source EDA toolchains.',
    coursesCount: 4,
    labsCount: 6,
    projectsCount: 8,
    reposCount: 6,
    toolsCount: 8,
    relatedCourseId: 1,
    relatedLabId: 'rtl-sim-lab',
    relatedProjectId: 'riscv-cpu'
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Version Control',
    iconName: 'GitBranch',
    desc: 'Distributed version control system for tracking hardware descriptions, scripts, and silicon IP.',
    coursesCount: 3,
    labsCount: 6,
    projectsCount: 8,
    reposCount: 6,
    toolsCount: 1,
    relatedCourseId: 1,
    relatedLabId: 'rtl-sim-lab',
    relatedProjectId: 'riscv-cpu'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Open Source',
    iconName: 'FolderGit2',
    desc: 'Collaborative development platform hosting eChipHub open-source hardware repositories.',
    coursesCount: 6,
    labsCount: 6,
    projectsCount: 8,
    reposCount: 6,
    toolsCount: 1,
    relatedCourseId: 1,
    relatedLabId: 'rtl-sim-lab',
    relatedProjectId: 'riscv-cpu'
  }
]

// ── Workshops Catalog ──
export interface WorkshopItem {
  id: string
  title: string
  date: string
  status: 'LIVE' | 'UPCOMING' | 'COMPLETED'
  technologies: string[]
  desc: string
  instructor: string
  image: string
  href: string
}

export const WORKSHOPS: WorkshopItem[] = [
  {
    id: 'ws-1',
    title: 'RTL to GDSII Flow with OpenLane & Sky130',
    date: 'March 2026',
    status: 'LIVE',
    technologies: ['OpenLane', 'Sky130', 'Yosys'],
    instructor: 'Dr. Anand Kumar (Senior ASIC Architect)',
    desc: 'A hands-on deep dive taking a synthesizable digital block through floorplanning to tape-out clean GDSII.',
    image: new URL('../../Website Image/Workshop BG Final (1).jpg', import.meta.url).href,
    href: 'https://echiphub.in/all-courses/'
  },
  {
    id: 'ws-2',
    title: 'RISC-V Microarchitecture & Pipelined Core Bring-up',
    date: 'April 2026',
    status: 'UPCOMING',
    technologies: ['RISC-V', 'Verilog', 'FPGA'],
    instructor: 'Prof. R. Sengupta (Computer Architecture Lead)',
    desc: 'Build and debug an RV32I pipelined processor with hazard detection, branch prediction, and UART communication.',
    image: new URL('../../Website Image/SOC.jpeg', import.meta.url).href,
    href: 'https://echiphub.in/all-courses/'
  },
  {
    id: 'ws-3',
    title: 'Analog CMOS Layout & Parasitic Extraction with Magic',
    date: 'February 2026',
    status: 'COMPLETED',
    technologies: ['SPICE', 'Magic', 'Ngspice'],
    instructor: 'Priya Sharma (Analog IC Mentor)',
    desc: 'Full-custom analog layout matching techniques, common-centroid placement, and DRC/LVS physical sign-off.',
    image: new URL('../../Website Image/tile1-1024x683.jpeg', import.meta.url).href,
    href: 'https://echiphub.in/all-courses/'
  },
  {
    id: 'ws-4',
    title: 'Static Timing Analysis (STA) Sign-Off using OpenSTA',
    date: 'January 2026',
    status: 'COMPLETED',
    technologies: ['STA', 'OpenSTA', 'SDC'],
    instructor: 'K. Venkatesh (Timing Closure Specialist)',
    desc: 'Master setup/hold slack calculation, clock domain crossing analysis, and multicycle timing constraints.',
    image: new URL('../../Website Image/DFT.jpeg', import.meta.url).href,
    href: 'https://echiphub.in/all-courses/'
  }
]

// ── Backward Compatible Metadata & Partnerships ──
export interface StatusMeta {
  label: string
  dot: string
  fg: string
  bg: string
  bd: string
  pulse?: boolean
}

export const STATUS_META: Record<Course['status'], StatusMeta> = {
  live:      { label: 'Live Now',  dot: '#e11d48', fg: '#be123c', bg: '#fff1f2', bd: '#fecdd3', pulse: true },
  completed: { label: 'Completed', dot: '#16a34a', fg: '#15803d', bg: '#f0fdf4', bd: '#bbf7d0' },
  upcoming:  { label: 'Upcoming',  dot: '#2254C4', fg: '#1d4ed8', bg: '#eff6ff', bd: '#bfdbfe' },
}

export interface FilterItem {
  key: 'all' | 'live' | 'upcoming' | 'completed'
  label: string
}

export const FILTERS: FilterItem[] = [
  { key: 'all',       label: 'All Courses' },
  { key: 'live',      label: 'Live' },
  { key: 'upcoming',  label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
]

export interface StatItem {
  to: number
  suffix: string
  label: string
  kind: string
}

export const STATS: StatItem[] = [
  { to: 1250, suffix: '+', label: 'Total Registered Candidates', kind: 'users' },
  { to: 5200, suffix: '+', label: 'Total Certified Candidates',  kind: 'badge' },
  { to: 48,   suffix: '',  label: 'Workshops Conducted',         kind: 'deck' },
  { to: 6,    suffix: '',  label: 'Upcoming Workshops',          kind: 'clock' },
  { to: 6,    suffix: '',  label: 'Cloud Virtual Labs',          kind: 'labs' },
  { to: 39,   suffix: '',  label: 'Open-Source Projects & Repos', kind: 'check' },
]

export interface HighlightItem {
  kind: string
  title: string
  desc: string
  image: string
}

export const HIGHLIGHTS: HighlightItem[] = [
  {
    kind: 'courses',
    title: 'Structured Learning Paths',
    desc: 'Industry-aligned semiconductor curricula delivered online with cloud-hosted virtual labs and reproducible demonstrations.',
    image: new URL('../../Website Image/Course BG 1.png', import.meta.url).href,
  },
  {
    kind: 'experts',
    title: 'Practicing Chip Architects',
    desc: 'Learn directly from practicing semiconductor engineers and academic mentors with real tape-out and EDA tool experience.',
    image: new URL('../../Website Image/Event 02.jpeg', import.meta.url).href,
  },
  {
    kind: 'centers',
    title: 'Nationwide Delivery',
    desc: 'NIELIT centres across India, including Noida, Ropar, Imphal, and Patna, deliver the program nationwide with MeitY support.',
    image: new URL('../../Website Image/nielit6.jpeg', import.meta.url).href,
  },
]

export interface LifecycleItem {
  n: string
  name: string
  desc: string
  image?: string
  kind?: string
}

export const LIFECYCLE: LifecycleItem[] = [
  { n: '01', name: 'RTL Design',        desc: 'Verilog & SystemVerilog design entry',         kind: 'rtl',      image: new URL('../../Website Image/verilog.png', import.meta.url).href },
  { n: '02', name: 'Verification',      desc: 'Testbenches, coverage, and formal checks',       kind: 'timing',   image: new URL('../../Website Image/DFT.jpeg', import.meta.url).href },
  { n: '03', name: 'Synthesis',         desc: 'Yosys RTL to gate level netlist',                kind: 'riscv',    image: new URL('../../Website Image/Asset-1.png', import.meta.url).href },
  { n: '04', name: 'Physical Design',   desc: 'Floorplanning, placement & routing via OpenLane', kind: 'openlane', image: new URL('../../Website Image/05-1.jpg', import.meta.url).href },
  { n: '05', name: 'GDSII Tape-out',    desc: 'DRC/LVS sign-off and layout ready for foundry',  kind: 'gds',      image: new URL('../../Website Image/08.png', import.meta.url).href },
]

export interface PartnerItem {
  name: string
  src: string
  href: string
}

export const PARTNERS: PartnerItem[] = [
  { name: 'MeitY',      src: 'https://echiphub.in/wp-content/uploads/2026/06/miety.png',        href: 'https://www.meity.gov.in/' },
  { name: 'NIELIT',     src: 'https://echiphub.in/wp-content/uploads/2026/06/NIELIT.png',       href: 'https://www.nielit.gov.in/' },
  { name: 'SoCTeamup',  src: 'https://echiphub.in/wp-content/uploads/2026/02/SOC-300x106.png',  href: 'https://www.socteamup.com/' },
  { name: 'SCL Mohali', src: 'https://echiphub.in/wp-content/uploads/2026/07/scllogo1.png',     href: 'https://www.scl.gov.in/' },
]

export interface CollaborationOrgItem {
  name: string
  src: string
  href?: string
}

export const COLLABORATION_ORGS: CollaborationOrgItem[] = [
  { name: 'NSUT', src: new URL('../../Website Image/NSUT_logo.png', import.meta.url).href },
  { name: 'AICTE', src: new URL('../../Website Image/Aicte.png', import.meta.url).href },
  { name: 'DTU', src: new URL('../../Website Image/DTU_logo (2).png', import.meta.url).href },
  { name: 'Tata Electronics', src: new URL('../../Website Image/Tata Electronics Corporate Logo.png', import.meta.url).href },
]

export interface GalleryItem {
  title: string
  kind: string
  image: string
  description: string
  tags: string[]
}

export const GALLERY: GalleryItem[] = [
  {
    title: 'RTL Simulation Lab',
    kind: 'rtl',
    image: 'RTL-1.jpeg',
    description: 'Covers logic entry in Verilog/SystemVerilog and verifying hardware behavioral models before physical implementation.',
    tags: ['RTL', 'Verification'],
  },
  {
    title: 'OpenLane Physical Design',
    kind: 'openlane',
    image: '05-1.jpg',
    description: 'An automated RTL to GDSII flow performing synthesis, floorplanning, placement, clock tree synthesis, and routing using open-source EDA tools.',
    tags: ['OpenLane', 'PD'],
  },
  {
    title: 'RISC-V Core Bring-up',
    kind: 'riscv',
    image: 'SOC.jpeg',
    description: 'Design, simulation, and software execution on open-standard RISC-V CPU core pipelines.',
    tags: ['RISC-V', 'SoC'],
  },
  {
    title: 'Analog and Mixed-Signal',
    kind: 'analog',
    image: 'tile1-1024x683.jpeg',
    description: 'Simulating non-digital interfaces, such as ADCs, DACs, and Phase-Locked Loops with SPICE.',
    tags: ['AMS', 'SPICE'],
  },
  {
    title: 'Timing Sign-off',
    kind: 'timing',
    image: 'DFT.jpeg',
    description: 'Static Timing Analysis to check path delays, crosstalk, setup, and hold time constraints across corners.',
    tags: ['STA', 'Timing'],
  },
  {
    title: 'GDSII Tape-out',
    kind: 'gds',
    image: '08.png',
    description: 'Final DRC and LVS physical verification and export to standard GDSII layout format ready for foundry manufacturing.',
    tags: ['GDSII', 'Tape-out'],
  },
]

export interface ProgramItem {
  kind: string
  title: string
  desc: string
  href: string
  cta: string
  image: string
}

export const PROGRAMS: ProgramItem[] = [
  {
    kind: 'workshops',
    title: 'Workshops',
    desc: 'Live and recorded sessions with industry engineers covering EDA flows, verification, and tape out readiness.',
    href: 'https://echiphub.in/all-courses/',
    cta: 'View Workshops',
    image: 'Workshop BG Final (1).jpg',
  },
  {
    kind: 'courses',
    title: 'Courses',
    desc: 'NSQF-aligned bootcamps and the 90-hour ChipCraft course taking learners through the complete RTL to GDSII flow.',
    href: 'https://echiphub.in/all-courses/',
    cta: 'Browse Courses',
    image: 'new-course.jpeg',
  },
  {
    kind: 'labs',
    title: 'Labs',
    desc: 'ChipCraft Virtual Labs provide cloud-hosted, pre-configured open-source EDA toolchains accessible from anywhere.',
    href: 'https://echiphub.in/all-courses/',
    cta: 'Enter Labs',
    image: 'SOC.jpeg',
  },
]

export interface AnnouncementItem {
  tag: string
  text: string
  href: string
}

export const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    tag: 'INTERNSHIP UPDATE',
    text: 'Certification exam results for eChipHub Internship Program 2026 (Attempt 1)',
    href: 'https://echiphub.in/wp-content/uploads/2026/08/eChipHub_Internship_Provisional_List_5June_to_31July_2026.pdf',
  },
  {
    tag: 'EXAM SCHEDULE',
    text: 'eChipHub 8-Week Internship Certification Examination Schedule',
    href: 'https://echiphub.in/wp-content/uploads/2026/08/eChiphub_examination.pdf',
  },
  {
    tag: 'SELECTED CANDIDATES',
    text: 'eChipHub Internship Program (Summer 2026) list of selected candidates',
    href: 'https://echiphub.in/wp-content/uploads/2026/06/Selected-Candidate-List-eChipHub-Internship-Program-Summer-2026.pdf',
  },
  {
    tag: 'GUIDELINES',
    text: 'Internship Completion and Certification Guidelines',
    href: 'https://echiphub.in/wp-content/uploads/2026/07/Internship-Certification-Guidelines.pdf',
  },
]
