if __name__ == "__main__":
    import os
    import psutil

    p = psutil.Process(os.getpid())
    cpu_core_idcs = [4]  # Use CPU core 4
    p.cpu_affinity(cpu_core_idcs)
    p.nice(psutil.HIGH_PRIORITY_CLASS)
    print("Running on CPU {} with HIGH priority.".format(', '.join((str(i) for i in cpu_core_idcs))))



    from core.ui_controller import Uia2Controller
    from tasks.task import Task
    from tasks import *
    from tap import Tap

    uic = Uia2Controller()

    def map_to_task(abbr: str) -> Task:
        mapping = {
            "dm": CoopDistortionMonolith(uic),
        }
        return mapping[abbr]

    class Args(Tap):
        task: Task
        current_wave_count: int = 100
        max_wave_count: int = 10000

        def configure(self):
            self.add_argument('--task', '-t', type=map_to_task)
            self.add_argument('--current_wave_count', '-c')
            self.add_argument('--max_wave_count', '-m')

    def main(args: Args):
        args.task.run(args)

    args = Args().parse_args()
    main(args)
